import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../libs/abstract-class/index.js';
import { Component, HttpMethod } from '../../libs/enum/index.js';
import { Logger, DispatcherServiceInterface } from '../../libs/interface/index.js';
import {fillObject} from '../../libs/util/index.js';
import {AppealRdo} from './rdo/appeal.rdo.js';
import {RequestParams, RequestBody, RequestQuery} from '../../libs/type/index.js';
import {AnswerDto} from './dto/answer.dto.js';
import {GeneralAnswerDto} from './dto/general-answer.dto.js';
import {
  ValidateDtoMiddleware,
  ValidateIdAppealMiddleware,
  ValidateQueryMiddleware
} from '../../libs/middleware/index.js';
import {QueryParamsDto} from './dto/query-params.dto.js';

@injectable()
export class DispatcherController extends BaseController {
  constructor(
    @inject(Component.AppLogger) protected readonly appLogger: Logger,
    @inject(Component.DispatcherService) private readonly dispatcherService: DispatcherServiceInterface
  ) {
    super(appLogger);

    this.appLogger.info('Register routes for DispatcherController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getAppeal
    });

    this.addRoute({
      path: '/completed',
      method: HttpMethod.Patch,
      handler: this.completedAppeal,
      middlewares: [
        new ValidateDtoMiddleware(AnswerDto),
        new ValidateIdAppealMiddleware()
      ]
    });

    this.addRoute({
      path: '/canceled',
      method: HttpMethod.Patch,
      handler: this.cancelAppeal,
      middlewares: [
        new ValidateDtoMiddleware(AnswerDto),
        new ValidateIdAppealMiddleware()
      ]
    });

    this.addRoute({
      path: '/canceled/all/appeals',
      method: HttpMethod.Patch,
      handler: this.cancelAllAppeals,
      middlewares: [
        new ValidateDtoMiddleware(GeneralAnswerDto),
      ]
    });

    this.addRoute({
      path: '/search/appeals',
      method: HttpMethod.Get,
      handler: this.getAppealsByData,
      middlewares: [
        new ValidateQueryMiddleware(QueryParamsDto)
      ]
    });
  }

  public async getAppeal(_req: Request, res: Response): Promise<void> {
    const dataAppeal = await this.dispatcherService.getAppeal();

    this.ok(res, fillObject(AppealRdo, dataAppeal));
  }

  public async completedAppeal(
    {body}: Request<RequestParams, RequestBody, AnswerDto>,
    res: Response
  ): Promise<void> {
    const resultAnswer = await this.dispatcherService.completedAppeal(body);

    this.created(res, resultAnswer);
  }

  public async cancelAppeal(
    {body}: Request<RequestParams, RequestBody, AnswerDto>,
    res: Response
  ): Promise<void> {
    const resultAnswer = await this.dispatcherService.cancelAppeal(body);

    this.created(res, resultAnswer);
  }

  public async cancelAllAppeals(
    {body}: Request<RequestParams, RequestBody, GeneralAnswerDto>,
    res: Response
  ): Promise<void> {
    const resultAnswer = await this.dispatcherService.cancelAllAppeals(body);

    this.created(res, resultAnswer);
  }

  public async getAppealsByData(
    {query}: Request<RequestParams, unknown, RequestBody, RequestQuery>,
    res: Response
  ): Promise<void> {
    const {from, to} = query;
    const dataAppealsList = await this.dispatcherService
      .getAppealsByData({
        from: from as string,
        to: to as string
      });

    const resultAnswer = dataAppealsList.length !== 0 ? dataAppealsList : 'На полученные даты не чего нет в базе данных. Введите другие даты.';

    this.ok(res, fillObject(AppealRdo, resultAnswer));
  }
}
