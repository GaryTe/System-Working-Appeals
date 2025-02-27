import {
  IsString,
  Validate,
  IsOptional
} from 'class-validator';

import {ValidationMessageForQueryParamsDto} from '../../../libs/error-validation/index.js';
import {ValidationField} from '../../../libs/functions-validation/index.js';

const {
  from,
  to
} = ValidationMessageForQueryParamsDto;

export class QueryParamsDto {
  @IsString({message: from.string})
  @Validate(ValidationField, {message: from.typeData})
  public from!: string;

  @IsOptional()
  @IsString({message: to.string})
  @Validate(ValidationField, {message: to.typeData})
  public to!: string;
}
