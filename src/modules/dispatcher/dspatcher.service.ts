import { inject, injectable } from 'inversify';

import {Component} from '../../libs/enum/index.js';
import {DataAppeal} from '../../libs/type/index.js';
import {DispatcherServiceInterface, DispatcherRepositoryInterface} from '../../libs/interface/index.js';
import {AnswerDto} from './dto/answer.dto.js';
import {GeneralAnswerDto} from './dto/general-answer.dto.js';
import {QueryParamsDto} from './dto/query-params.dto.js';

@injectable()
export class DispatcherService implements DispatcherServiceInterface {
  constructor(
    @inject(Component.DispatcherRepository) private readonly dispatcherRepository: DispatcherRepositoryInterface
  ) {}

  public async getAppeal(): Promise<DataAppeal> {
    const dataAppeal = await this.dispatcherRepository.getAppeal();

    return dataAppeal;
  }

  public async changeStatus(dto: AnswerDto): Promise<string> {
    const {email, client} = await this.dispatcherRepository.changeStatus(dto);

    const resultAnswer = `Ответ по обращению под номером ${dto.id}, направлено на email: ${email}, получатель ${client}.`;

    return resultAnswer;
  }

  public async cancelAppeal(dto: AnswerDto): Promise<string> {
    const {email, client} = await this.dispatcherRepository.cancelAppeal(dto);

    const resultAnswer = `Ответ по обращению под номером ${dto.id}, направлено на email: ${email}, получатель ${client}.`;

    return resultAnswer;
  }

  public async cancelAllAppeals(_dto: GeneralAnswerDto): Promise<string> {
    const dataAppealsList = await this.dispatcherRepository.cancelAllAppeals();

    if(dataAppealsList.length === 0) {
      return 'Обращений в статусе "в работе" не найдено.';
    }

    const dataIdList = dataAppealsList.map((appeal) => appeal.id);
    const resultAnswer = `Обращения под номерами: ${dataIdList.join(' , ')}, отменены.`;

    return resultAnswer;
  }

  public async getAppealsByData(dto: QueryParamsDto): Promise<DataAppeal[] | []> {
    const queryParams = {
      from: dto.from < dto.to ? dto.from : dto.to,
      to: dto.to > dto.from ? dto.to : dto.from
    };

    const dataAppealsList = await this.dispatcherRepository.getAppealsByData(queryParams);

    return dataAppealsList;
  }
}
