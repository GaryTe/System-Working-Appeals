import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {ApplicationEnvironment} from './application-evironment.js';
import {ApplicationConfig} from '../../interface/index.js';
import {DEFAULT_APPLICATION_PORT} from '../../const/index.js';
import {Constraints} from '../../type/index.js';

export const getVariableEnvironmentFroApp = (): ApplicationConfig => {
  const applicationConfig: ApplicationConfig = {
    host: process.env.HOST,
    port: process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : DEFAULT_APPLICATION_PORT
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
