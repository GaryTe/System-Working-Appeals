import {
  IsString,
  MinLength
} from 'class-validator';

import {LENGTH_TEXT} from '../../../libs/const/index.js';
import {ValidationMessageForGeneralAnswerDto} from '../../../libs/error-validation/index.js';

const {
  answer
} = ValidationMessageForGeneralAnswerDto;

export class GeneralAnswerDto {
  @IsString({message: answer.string})
  @MinLength(LENGTH_TEXT, {message: answer.length})
  public answer!: string;
}
