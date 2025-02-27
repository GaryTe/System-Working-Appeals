import { inject, injectable } from 'inversify';

import {AppealDto} from './dto/appeal.dto.js';
import {Component} from '../../libs/enum/index.js';
import {DataAppeal} from '../../libs/type/index.js';
import {AppealServiceInterface, AppealRepositoryInterface} from '../../libs/interface/index.js';
import {transporter} from '../../libs/mail/index.js';
import {SENDER, SUBJECT} from '../../libs/const/index.js';

@injectable()
export class AppealService implements AppealServiceInterface {
  constructor(
    @inject(Component.AppealRepository) private readonly appealRepository: AppealRepositoryInterface
  ) {}

  public async create(dto: AppealDto): Promise<DataAppeal> {
    const dataAppeal = await this.appealRepository.create(dto);

    const result = await transporter.sendMail({
      from: `${SENDER}`,
      to: `${dataAppeal.email}`,
      subject: `${SUBJECT}`,
      text: `${dataAppeal.client}. Ваше обращение в очереди на обработку.
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
}
