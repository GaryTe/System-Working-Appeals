import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({ name: 'AppealDto', async: false })
export class ValidationNameClient implements ValidatorConstraintInterface {
  validate(name: string) {
    if (name === undefined || !(name.split(' ').length === 3)) {
      return false;
    }

    return true;
  }
}
