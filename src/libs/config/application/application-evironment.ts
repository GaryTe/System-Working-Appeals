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
}
