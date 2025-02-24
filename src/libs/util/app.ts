import {ApplicationError} from '../enum/index.js';
import {ValidationErrorField} from '../type/index.js';

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}
