import {injectable, inject} from 'inversify';
import express, {Express} from 'express';

import {Component} from '../libs/enum/index.js';
import {
  Application,
  Logger,
  ApplicationConfig,
  ExceptionFilter
} from '../libs/interface/index.js';
import {GetVariableEnvironmentFroApp, GetDataSource, DataSourceMail} from '../libs/type/index.js';
import {AppealController} from '../modules/appeal/appeal.controller.js';
import {DispatcherController} from '../modules/dispatcher/dispatcher.controller.js';

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
    @inject(Component.AppExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.DataSource) private readonly dataSource: GetDataSource,
    @inject(Component.AppealController) private readonly appealController: AppealController,
    @inject(Component.DispatcherController) private readonly dispatcherController: DispatcherController,
    @inject(Component.DataSourceMail) private readonly dataSourceMail: DataSourceMail,
  ) {
    this.server = express();
    this.config = this.appConfig();
  }

  private async initPostgresDb() {
    const appDataSource = await this.dataSource(
      this.config.host as string,
      this.config.postgresPort as number,
      this.config.postgresUserName as string,
      this.config.postgresPassword as string,
      this.config.postgresNameDatabase as string
    );

    await appDataSource.initialize()
      .then(() => {
        this.appLogger.info('Connection established to Postgres !!!');
      })
      .catch((error) => {
        throw new Error (error);
      });
  }

  private async initNodemailer() {
    await this.dataSourceMail(
      this.config.host as string,
      this.config.fakesmtpPort as number,
      false,
      {
        user: this.config.postgresUserName as string,
        pass: this.config.postgresPassword as string
      }
    ).then(() => {
      this.appLogger.info('Connection established to Nodemailer !!!');
    })
      .catch((error) => {
        throw new Error (error);
      });
  }

  private async initServer() {
    const port = this.config.port;
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/appeal', this.appealController.router);
    this.server.use('/dispatcher', this.dispatcherController.router);
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

    this.appLogger.info('Try to connect to Postgres.');
    await this.initPostgresDb();

    this.appLogger.info('Try to connect to Nodemailer.');
    await this.initNodemailer();

    this.appLogger.info('Init express middleware');
    await this.initMiddleware();
    this.appLogger.info('Express middleware initialization completed');

    this.appLogger.info('Init controllers');
    await this.initControllers();
    this.appLogger.info('Controller initialization completed');

    this.appLogger.info('Init exception filters');
    await this.initExceptionFilters();
    this.appLogger.info('Exception filters initialization compleated');

    this.appLogger.info('Try to init server');
    await this.initServer();
    this.appLogger.info(`Application is running on: http://${this.config.host}:${this.config.port}`);
  }
}
