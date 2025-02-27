import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {reduceValidationErrors} from '../util/index.js';
import {Middleware} from '../interface/index.js';
import {ValidationError} from '../exception-filter/index.js';

export class ValidateQueryMiddleware implements Middleware {
  constructor(private queryDto: ClassConstructor<object>) {}

  public async execute({ query, path}: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.queryDto, query);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: ${path}`, reduceValidationErrors(errors));
    }

    next();
  }
}
