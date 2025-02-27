import { NextFunction, Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

import {Middleware} from '../interface/index.js';
import {appDataSource} from '../database/index.js';
import {AppealEntity} from '../../modules/appeal/appeal.entity.js';
import {HttpError} from '../exception-filter/index.js';

export class ValidateIdAppealMiddleware implements Middleware {

  public async execute({ body: {id} }: Request, _res: Response, next: NextFunction): Promise<void> {
    const dataAppeal = await appDataSource.manager.findOne(AppealEntity, {
      where: {
        id: id
      },
    });

    if (!dataAppeal) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Appeal this number ${id}, not found in the database.`
      );
    }

    next();
  }
}
