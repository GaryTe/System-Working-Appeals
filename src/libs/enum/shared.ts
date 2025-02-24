export const Component = {
  App: Symbol.for('App'),
  AppLogger: Symbol.for('AppLogger'),
  AppConfig: Symbol.for('AppConfig'),
  AuthenticationExceptionFilter: Symbol.for('AuthenticationExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  AppExceptionFilter: Symbol.for('AppExceptionFilter')
} as const;
