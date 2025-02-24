import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ValidationErrorField } from '../type/index.js';
import {Component, ApplicationError} from '../enum/index.js';
import {Logger, ExceptionFilter} from '../interface/index.js';
import {createErrorObject} from '../util/index.js';

export class HttpError extends Error {
  public httpStatusCode!: number;
  public detail?: string;

  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.detail = detail;
  }
}

export class ValidationError extends HttpError {
  public details: ValidationErrorField[] = [];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}

export class BaseUserException extends HttpError {
  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(httpStatusCode, message, detail);
  }
}


@injectable()
export class AuthenticationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.AppLogger) private readonly appLogger: Logger
  ) {
    this.appLogger.info('Register AuthenticationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.appLogger.error(`[AuthenticationExceptionFilter] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'CONFLICT',
        error: error.message,
      });
  }
}

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.AppLogger) private readonly appLogger: Logger
  ) {
    this.appLogger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.appLogger.error(`[ValidationExceptionFilter]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.appLogger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}

@injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.AppLogger) private readonly appLogger: Logger
  ) {
    this.appLogger.info('Register HttpExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.appLogger.error(`[HttpExceptionFilter]: ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.AppLogger) private readonly appLogger: Logger
  ) {
    this.appLogger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.appLogger.error(`[AppExceptionFilter]: ${error.message}`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
