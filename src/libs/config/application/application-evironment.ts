import {
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '../../const/index.js';
import {EnvValidationMessageForApp} from '../../error-validation/index.js';

export class ApplicationEnvironment {
  @IsString({
    message: EnvValidationMessageForApp.host
  })
  public host!: string;

  @IsNumber({}, {
    message: EnvValidationMessageForApp.port
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port!: number;

  @IsString({
    message: EnvValidationMessageForApp.postgresNameDatabase
  })
  public postgresNameDatabase!: string;

  @IsString({
    message: EnvValidationMessageForApp.postgresUserName
  })
  public postgresUserName!: string;

  @IsString({
    message: EnvValidationMessageForApp.postgresPassword
  })
  public postgresPassword!: string;

  @IsString({
    message: EnvValidationMessageForApp.postgresEmail
  })
  public postgresEmail!: string;

  @IsNumber({}, {
    message: EnvValidationMessageForApp.postgresPort
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public postgresPort!: number;

  @IsNumber({}, {
    message: EnvValidationMessageForApp.fakesmtpPort
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public fakesmtpPort!: number;

}
