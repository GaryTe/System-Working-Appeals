import {Container} from 'inversify';

import {Component} from '../libs/enum/index.js';
import {
  Application,
  Logger,
  ExceptionFilter
} from '../libs/interface/index.js';
import {GetVariableEnvironmentFroApp, GetDataSource} from '../libs/type/index.js';
import {App} from './app.js';
import {getVariableEnvironmentFroApp} from '../libs/config/index.js';
import {AppLogger} from '../libs/logger/index.js';
import {
  AuthenticationExceptionFilter,
  ValidationExceptionFilter,
  HttpExceptionFilter,
  AppExceptionFilter
} from '../libs/exception-filter/index.js';
import {dataSource} from '../libs/database/index.js';

export function createAppContainer() {
  const appContainer = new Container();

  appContainer.bind<Application>(Component.App).to(App).inSingletonScope();
  appContainer.bind<Logger>(Component.AppLogger).to(AppLogger).inSingletonScope();
  appContainer.bind<GetVariableEnvironmentFroApp>(Component.AppConfig).toFunction(getVariableEnvironmentFroApp);
  appContainer.bind<ExceptionFilter>(Component.AuthenticationExceptionFilter).to(AuthenticationExceptionFilter).inSingletonScope();
  appContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  appContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  appContainer.bind<ExceptionFilter>(Component.AppExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  appContainer.bind<GetDataSource>(Component.DataSource).toFunction(dataSource);

  return appContainer;
}
