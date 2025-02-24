import {
  Request,
  Response,
  NextFunction
} from 'express';

export interface Application {
  init(): void;
}

export interface ApplicationConfig {
  host: string | undefined;
  port: number | undefined;
}

export interface ExceptionFilter {
  catch(error: Error, req: Request, res: Response, next:NextFunction): void;
}
