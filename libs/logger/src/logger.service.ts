import { ConsoleLogger, Injectable } from '@nestjs/common';
import { winstonLog } from './utils';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private app: string = '';

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    winstonLog(this.app, 'info', optionalParams[0], message);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
    winstonLog(this.app, 'error', optionalParams[0], message);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    winstonLog(this.app, 'warn', optionalParams[0], message);
  }

  setApp(app: string): void {
    this.app = app;
  }
}
