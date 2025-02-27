import {
  IsString,
  MinLength
} from 'class-validator';

import {LENGTH_TEXT} from '../../../libs/const/index.js';
import {ValidationMessageForAnswerDto} from '../../../libs/error-validation/index.js';

const {
  id,
  answer
} = ValidationMessageForAnswerDto;

export class AnswerDto {
  @IsString({message: id.string})
  @MinLength(LENGTH_TEXT, {message: id.length})
  public id!: string;

  @IsString({message: answer.string})
  @MinLength(LENGTH_TEXT, {message: answer.length})
  public answer!: string;
}
