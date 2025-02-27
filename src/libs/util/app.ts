import {ValidationError} from 'class-validator';

import {ApplicationError} from '../enum/index.js';
import {ValidationErrorField} from '../type/index.js';

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
