import {
  MinLength,
  IsEmail,
  IsString,
  Validate
} from 'class-validator';

import {ValidationMessageForAppealDto} from '../../../libs/error-validation/index.js';
import {ValidationNameClient} from '../../../libs/functions-validation/index.js';
import {LENGTH_TEXT} from '../../../libs/const/index.js';

const {
  client,
  email,
  topicAppeal,
  appeal
} = ValidationMessageForAppealDto;

export class AppealDto {
  @IsString({message: client.string})
  @MinLength(LENGTH_TEXT, {message: client.length})
  @Validate(ValidationNameClient, {message: client.typeData})
  public client!: string;

  @IsEmail({}, {message: email})
  public email!: string;

  @IsString({message: topicAppeal.string})
  @MinLength(LENGTH_TEXT, {message: topicAppeal.length})
  public topicAppeal!: string;

  @IsString({message: appeal.string})
  @MinLength(LENGTH_TEXT, {message: appeal.length})
  public appeal!: string;
}
