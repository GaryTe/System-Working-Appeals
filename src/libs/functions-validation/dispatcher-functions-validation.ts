import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

import {REG_DATA} from '../const/index.js';

@ValidatorConstraint({ name: 'QueryParamsDto', async: false })
export class ValidationField implements ValidatorConstraintInterface {
  validate(field: string) {

    if(!(REG_DATA.test(field))) {
      return false;
    }

    return true;
  }
}
