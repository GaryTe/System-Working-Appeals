import {DataSource} from 'typeorm';

import {WAITING_TIME} from '../const/index.js';
import {AppealEntity} from '../../modules/appeal/appeal.entity.js';


export let appDataSource: DataSource;

export const dataSource = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
): Promise<DataSource> => {
  appDataSource = new DataSource({
    type: 'postgres',
    entities: [AppealEntity],
    synchronize: true,
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    connectTimeoutMS: WAITING_TIME
  });

  return appDataSource;
};
