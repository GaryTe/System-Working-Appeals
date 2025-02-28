import { inject, injectable } from 'inversify';

import {Component} from '../../libs/enum/index.js';
import {DataAppeal, DataCancelAllAppeals} from '../../libs/type/index.js';
import {DispatcherServiceInterface, DispatcherRepositoryInterface} from '../../libs/interface/index.js';
import {AnswerDto} from './dto/answer.dto.js';
import {GeneralAnswerDto} from './dto/general-answer.dto.js';
import {QueryParamsDto} from './dto/query-params.dto.js';
import {sendMail} from '../../libs/mail/index.js';
import {matchShiftValue} from '../../libs/util/index.js';

@injectable()
export class DispatcherService implements DispatcherServiceInterface {
  constructor(
    @inject(Component.DispatcherRepository) private readonly dispatcherRepository: DispatcherRepositoryInterface
  ) {}

  public async getAppeal(): Promise<DataAppeal | string> {
    const dataAppeal = await this.dispatcherRepository.getAppeal();

    if(!dataAppeal) {
      return 'Новых обращений не поступало.';
    }

    const statusResponse = await sendMail(
      dataAppeal,
      `Ваше обращение в работе.
      Ответ будет направлен Вам на email ${dataAppeal.email}.`
    );

    return {
      ...dataAppeal,
      statusResponse: statusResponse
    };
  }

  public async completedAppeal(dto: AnswerDto): Promise<string> {
    const dataAppeal = await this.dispatcherRepository.completedAppeal(dto);

    const statusResponse = await sendMail(dataAppeal, dto.answer);

    return statusResponse;
  }

  public async cancelAppeal(dto: AnswerDto): Promise<string> {
    const dataAppeal = await this.dispatcherRepository.cancelAppeal(dto);

    const statusResponse = await sendMail(dataAppeal, dto.answer);

    return statusResponse;
  }

  public async cancelAllAppeals(dto: GeneralAnswerDto): Promise<DataCancelAllAppeals | string> {
    const statusResponsesList: string[] = [];
    const dataAppealsList = await this.dispatcherRepository.cancelAllAppeals();

    if(dataAppealsList.length === 0) {
      return 'Обращений в статусе "в работе" не найдено.';
    }

    for await (const appeal of dataAppealsList) {
      const statusResponse = await sendMail(appeal, dto.answer);
      statusResponsesList.push(statusResponse);
    }

    const dataIdList = dataAppealsList.map((appeal) => appeal.id);
    const resultAnswer = `Обращения под номерами: ${dataIdList.join(' , ')}, отменены.`;

    return {
      statusResponse: statusResponsesList,
      resultOperation: resultAnswer
    };
  }

  public async getAppealsByData(dto: QueryParamsDto): Promise<DataAppeal[] | []> {
    const queryParams = dto.to ? matchShiftValue(dto) : dto;

    const dataAppealsList = await this.dispatcherRepository.getAppealsByData(queryParams);

    return dataAppealsList;
  }
}
