import {ApplicationConfig} from '../interface/index.js';

export type Constraints = {
  [type: string]: string;
}

export type GetVariableEnvironmentFroApp = () => ApplicationConfig

export type ValidationErrorField = {
  property: string;
  value: string;
  messages: string[];
};
