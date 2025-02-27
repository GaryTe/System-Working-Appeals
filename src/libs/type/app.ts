import {DataSource} from 'typeorm';
import {Transporter} from 'nodemailer';

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
export type DataSourceMail = (host: string, port: number, secure: boolean, auth: {
  user: string;
  pass: string;
}) => Promise<Transporter>;
