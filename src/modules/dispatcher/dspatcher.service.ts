import { inject, injectable } from 'inversify';

import {Component} from '../../libs/enum/index.js';
import {DataAppeal, DataCancelAllAppeals} from '../../libs/type/index.js';
import {DispatcherServiceInterface, DispatcherRepositoryInterface} from '../../libs/interface/index.js';
import {AnswerDto} from './dto/answer.dto.js';
import {GeneralAnswerDto} from './dto/general-answer.dto.js';
import {QueryParamsDto} from './dto/query-params.dto.js';
import {transporter} from '../../libs/mail/index.js';
import {SENDER, SUBJECT} from '../../libs/const/index.js';

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

    const result = await transporter.sendMail({
      from: `${SENDER}`,
      to: `${dataAppeal.email}`,
      subject: `${SUBJECT}`,
      text: `${dataAppeal.client}. Ваше обращение в работе.
      Ответ будет направлен Вам на email ${dataAppeal.email}.
      Телефон Call Centra: +7(000)000-00-00`
    })
      .then((response) => response)
      .catch(() => null);

    const statusResponse = result ? `Ответ направлен на email: ${dataAppeal.email}, кому: ${dataAppeal.client}.` : `Ответ не направлен на email: ${dataAppeal.email}, кому: ${dataAppeal.client}.`;

    return {
      ...dataAppeal,
      statusResponse: statusResponse
    };
  }

  public async completedAppeal(dto: AnswerDto): Promise<string> {
    const {email, client} = await this.dispatcherRepository.completedAppeal(dto);

    const result = await transporter.sendMail({
      from: `${SENDER}`,
      to: `${email}`,
      subject: `${SUBJECT}`,
      text: `${client}. ${dto.answer}
      Телефон Call Centra: +7(000)000-00-00`
    })
      .then((response) => response)
      .catch(() => null);

    const statusResponse = result ? `Ответ по обращению под номером ${dto.id}, направлено на email: ${email}, получатель ${client}.` : `Ответ не направлен на email: ${email}, кому: ${client}.`;

    return statusResponse;
  }

  public async cancelAppeal(dto: AnswerDto): Promise<string> {
    const {email, client} = await this.dispatcherRepository.cancelAppeal(dto);

    const result = await transporter.sendMail({
      from: `${SENDER}`,
      to: `${email}`,
      subject: `${SUBJECT}`,
      text: `${client}. ${dto.answer}
      Телефон Call Centra: +7(000)000-00-00`
    })
      .then((response) => response)
      .catch(() => null);

    const statusResponse = result ? `Ответ по обращению под номером ${dto.id}, направлено на email: ${email}, получатель ${client}.` : `Ответ не направлен на email: ${email}, кому: ${client}.`;

    return statusResponse;
  }

  public async cancelAllAppeals(dto: GeneralAnswerDto): Promise<DataCancelAllAppeals | string> {
    const statusResponsesList: string[] = [];
    const dataAppealsList = await this.dispatcherRepository.cancelAllAppeals();

    if(dataAppealsList.length === 0) {
      return 'Обращений в статусе "в работе" не найдено.';
    }

    for await (const appeal of dataAppealsList) {
      const result = await transporter.sendMail({
        from: `${SENDER}`,
        to: `${appeal.email}`,
        subject: `${SUBJECT}`,
        text: `${appeal.client}. ${dto.answer}
        Телефон Call Centra: +7(000)000-00-00`
      })
        .then((response) => response)
        .catch(() => null);

      const statusResponse = result ? `Ответ по обращению под номером ${appeal.id}, направлено на email: ${appeal.email}, получатель ${appeal.client}.` : `Ответ не направлен на email: ${appeal.email}, кому: ${appeal.client}.`;
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
    const queryParams = {
      from: dto.from < dto.to ? dto.from : dto.to,
      to: dto.to > dto.from ? dto.to : dto.from
    };

    const dataAppealsList = await this.dispatcherRepository.getAppealsByData(queryParams);

    return dataAppealsList;
  }
}
