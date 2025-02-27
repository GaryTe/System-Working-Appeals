import {DataSource} from 'typeorm';

import {ApplicationConfig} from '../interface/index.js';

export type Constraints = {
  [type: string]: string;
}

export type GetVariableEnvironmentFroApp = () => ApplicationConfig

export type ValidationErrorField = {
  property: string;
  value: string;
  messages: string[];
};

export type GetDataSource = (host: string, port: number, username: string, password: string, database: string) => Promise<DataSource>
