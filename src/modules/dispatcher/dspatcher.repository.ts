import {injectable} from 'inversify';

import {appDataSource} from '../../libs/database/index.js';
import {DataAppeal} from '../../libs/type/index.js';
import {StatusAppeal} from '../../libs/enum/index.js';
import {TYPE_SORT, LIMIT} from '../../libs/const/index.js';
import {DispatcherRepositoryInterface} from '../../libs/interface/index.js';
import {AnswerDto} from './dto/answer.dto.js';
import {QueryParamsDto} from './dto/query-params.dto.js';

@injectable()
export class DispatcherRepository implements DispatcherRepositoryInterface {

  public async getAppeal(): Promise<DataAppeal> {

    const dataAppealsList = await appDataSource.manager.query(`
      WITH dataAppeal AS (
      SELECT *
      FROM appeal
      WHERE appeal.status = '${StatusAppeal.New}'
      ORDER BY appeal.created_at ${TYPE_SORT}
      LIMIT ${LIMIT}
      )
      UPDATE appeal
      SET status = '${StatusAppeal['In work']}'
      FROM dataAppeal
      WHERE dataAppeal.id = appeal.id
      RETURNING
      appeal.id,
      appeal.created_at,
      appeal.client,
      appeal.email,
      appeal.topic_appeal,
      appeal.appeal,
      appeal.status
      `
    );

    return dataAppealsList.find((item: DataAppeal[]) => item).find((item: DataAppeal) => item);
  }

  public async changeStatus(dto: AnswerDto): Promise<DataAppeal> {
    const dataAppealsList = await appDataSource.manager.query(`
      UPDATE appeal
      SET status = '${StatusAppeal.Completed}'
      WHERE appeal.id = '${dto.id}'
      RETURNING *
      `
    );

    return dataAppealsList.find((item: DataAppeal[]) => item).find((item: DataAppeal) => item);
  }

  public async cancelAppeal(dto: AnswerDto): Promise<DataAppeal> {
    const dataAppealsList = await appDataSource.manager.query(`
      UPDATE appeal
      SET status = '${StatusAppeal.Canceled}'
      WHERE appeal.id = '${dto.id}'
      RETURNING *
      `
    );

    return dataAppealsList.find((item: DataAppeal[]) => item).find((item: DataAppeal) => item);
  }

  public async cancelAllAppeals(): Promise<DataAppeal[] | []> {
    const dataAppealsList = await appDataSource.manager.query(`
      UPDATE appeal
      SET status = '${StatusAppeal.Canceled}'
      WHERE appeal.status = '${StatusAppeal['In work']}'
      RETURNING *
      `
    );

    return dataAppealsList.find((item: DataAppeal[]) => item);
  }

  public async getAppealsByData(dto: QueryParamsDto): Promise<DataAppeal[] | []> {
    const {from, to} = dto;

    if(to === undefined) {
      const dataAppealsList = await appDataSource.manager.query(`
        SELECT*
        FROM appeal
        WHERE to_char(appeal.created_at, 'dd.mm.yyyy') = '${from}'
        ORDER BY created_at ${TYPE_SORT}
        `
      );
      return dataAppealsList;
    }

    const dataAppealsList = await appDataSource.manager.query(`
      SELECT*
      FROM appeal
      WHERE to_char(appeal.created_at, 'dd.mm.yyyy') BETWEEN '${from}' AND '${to}'
      ORDER BY created_at ${TYPE_SORT}
      `
    );
    return dataAppealsList;
  }
}
