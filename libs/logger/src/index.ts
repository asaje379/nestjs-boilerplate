import winston from 'winston';
import { Loggers } from './base';
import { BasicLogger } from './basic.logger';

export class Logger<T> {
  instance: T;

  use(loggerName: string) {
    this.instance = Loggers[loggerName] as T;
  }

  get log() {
    return this.instance;
  }
}

export const logger = new Logger<winston.Logger>();
export const stdoutLogger = new Logger<BasicLogger>();
stdoutLogger.use('basic');
