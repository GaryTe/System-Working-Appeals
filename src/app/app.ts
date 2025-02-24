import {injectable, inject} from 'inversify';
import express, {Express} from 'express';

import {Component} from '../libs/enum/index.js';
import {
  Application,
  Logger,
  ApplicationConfig,
  ExceptionFilter
} from '../libs/interface/index.js';
import {GetVariableEnvironmentFroApp} from '../libs/type/index.js';

@injectable()
export class App implements Application {
  private readonly server: Express;
  private readonly config: ApplicationConfig;

  constructor(
    @inject(Component.AppConfig) private readonly appConfig: GetVariableEnvironmentFroApp,
    @inject(Component.AppLogger) private readonly appLogger: Logger,
    @inject(Component.AuthenticationExceptionFilter) private readonly authenticationExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.AppExceptionFilter) private readonly appExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
    this.config = this.appConfig();
  }

  private async initServer() {
    const port = this.config.port;
    this.server.listen(port);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.authenticationExceptionFilter.catch.bind(this.authenticationExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.appLogger.info('REST Application initialization');

    this.appLogger.info('Init express middleware');
    await this.initMiddleware();
    this.appLogger.info('Express middleware initialization completed');

    this.appLogger.info('Init exception filters');
    await this.initExceptionFilters();
    this.appLogger.info('Exception filters initialization compleated');

    this.appLogger.info('Try to init server');
    await this.initServer();
    this.appLogger.info(`Application is running on: http://${this.config.host}:${this.config.port}`);
  }
}
