import {injectable} from 'inversify';

import {AppealDto} from './dto/appeal.dto.js';
import {appDataSource} from '../../libs/database/index.js';
import {DataAppeal} from '../../libs/type/index.js';
import {AppealRepositoryInterface} from '../../libs/interface/index.js';

@injectable()
export class AppealRepository implements AppealRepositoryInterface {

  public async create(dto: AppealDto): Promise<DataAppeal> {
    const {client, email, topicAppeal, appeal} = dto;

    const dataAppeal = await appDataSource.manager.query(`
      INSERT INTO appeal
      VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4, DEFAULT)
      RETURNING *
      `,
    [client, email, topicAppeal, appeal]
    );

    return dataAppeal.find((item: DataAppeal) => item);
  }
}
