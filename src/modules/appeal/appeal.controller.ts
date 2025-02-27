import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../libs/abstract-class/index.js';
import { Component, HttpMethod } from '../../libs/enum/index.js';
import { Logger } from '../../libs/interface/index.js';
import {RequestParams, RequestBody} from '../../libs/type/index.js';
import {AppealDto} from './dto/appeal.dto.js';
import {ValidateDtoMiddleware} from '../../libs/middleware/index.js';
import {fillObject} from '../../libs/util/index.js';
import {AppealRdo} from './rdo/appeal.rdo.js';
import {AppealServiceInterface} from '../../libs/interface/index.js';


@injectable()
export class AppealController extends BaseController {
  constructor(
    @inject(Component.AppLogger) protected readonly appLogger: Logger,
    @inject(Component.AppealService) private readonly appealService: AppealServiceInterface
  ) {
    super(appLogger);

    this.appLogger.info('Register routes for AppealController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(AppealDto)]
    });
  }

  public async create(
    { body }: Request<RequestParams, RequestBody, AppealDto>,
    res: Response
  ): Promise<void> {
    const dataAppeal = await this.appealService.create(body);

    this.created(res, fillObject(AppealRdo, dataAppeal));
  }
}
