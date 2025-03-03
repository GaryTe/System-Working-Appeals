import { injectable } from 'inversify';
import { Router, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import cors from 'cors';

import {Controller, Logger, Route, RouteOptions} from '../../interface/index.js';
import {DEFAULT_CONTENT_TYPE} from '../../const/index.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly appLogger: Logger,
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));

    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    this._router[route.method](route.path, cors(route.optionsCors), allHandlers);
    this.appLogger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public addOptionsMethod(route: RouteOptions) {
    this._router[route.method](route.path, cors(route.optionsCors));
    this.appLogger.info(`OptionsRoute registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public ok<T>(res: Response, data?: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
