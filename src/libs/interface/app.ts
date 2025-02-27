import {
  Request,
  Response,
  NextFunction
} from 'express';

import {AppealDto} from '../../modules/appeal/dto/appeal.dto.js';
import {DataAppeal} from '../type/index.js';

export interface Application {
  init(): void;
}

export interface ApplicationConfig {
  host: string | undefined;
  port: number | undefined;
  postgresNameDatabase: string | undefined;
  postgresUserName: string | undefined;
  postgresPassword: string | undefined;
  postgresEmail: string | undefined;
  postgresPort: number | undefined;
  fakesmtpPort: number | undefined;
}

export interface ExceptionFilter {
  catch(error: Error, req: Request, res: Response, next:NextFunction): void;
}

export interface AppealServiceInterface {
  create(dto: AppealDto): Promise<DataAppeal>;
}

export interface AppealRepositoryInterface {
  create(dto: AppealDto): Promise<DataAppeal>;
}
