import { Logger as PinoInstance, pino } from 'pino';
import {injectable} from 'inversify';

import { Logger } from '../interface/index.js';

@injectable()
export class AppLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino();
    this.logger.info('AppLogger created');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
