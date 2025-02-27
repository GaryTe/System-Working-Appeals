export const Component = {
  App: Symbol.for('App'),
  AppLogger: Symbol.for('AppLogger'),
  AppConfig: Symbol.for('AppConfig'),
  AuthenticationExceptionFilter: Symbol.for('AuthenticationExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  AppExceptionFilter: Symbol.for('AppExceptionFilter'),
  DataSource: Symbol.for('DataSource'),
  AppealController: Symbol.for('AppealController'),
  AppealService: Symbol.for('AppealService'),
  AppealRepository: Symbol.for('AppealRepository'),
  DispatcherController: Symbol.for('DispatcherController'),
  DispatcherService: Symbol.for('DispatcherService'),
  DispatcherRepository: Symbol.for('DispatcherRepository'),
  DataSourceMail: Symbol.for('dataSourceMail')
} as const;
