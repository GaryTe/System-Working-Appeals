import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {ApplicationEnvironment} from './application-evironment.js';
import {ApplicationConfig} from '../../interface/index.js';
import {
  DEFAULT_APPLICATION_PORT,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_SMTP_PORT
} from '../../const/index.js';
import {Constraints} from '../../type/index.js';

export const getVariableEnvironmentFroApp = (): ApplicationConfig => {
  const applicationConfig: ApplicationConfig = {
    host: process.env.HOST,
    port: process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : DEFAULT_APPLICATION_PORT,
    postgresNameDatabase: process.env.POSTGRES_DB,
    postgresUserName: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresEmail: process.env.PGADMIN_EMAIL,
    postgresPort: process.env.POSTGRES_PORT !== undefined ? parseInt(process.env.POSTGRES_PORT, 10) : DEFAULT_POSTGRES_PORT,
    fakesmtpPort: process.env.SMTP_PORT !== undefined ? parseInt(process.env.SMTP_PORT, 10) : DEFAULT_SMTP_PORT
  };

  const applicationEnvironment = plainToInstance(
    ApplicationEnvironment,
    applicationConfig,
    { enableImplicitConversion: true }
  );

  const errors: ValidationError[] | [] = validateSync(
    applicationEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    const {constraints} = errors.find((item: ValidationError) => item)as unknown as Constraints;
    const err: string = Object.values(constraints).join(',');
    throw new Error(err);
  }

  return applicationConfig;
};
