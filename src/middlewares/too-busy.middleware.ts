import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as toobusy from 'toobusy-js';

@Injectable()
export class TooBusyMiddleware implements NestMiddleware {
  async use(_: Request, __: Response, next: NextFunction) {
    process.on('SIGINT', () => {
      toobusy.shutdown();
      process.exit();
    });

    toobusy.maxLag(10);
    toobusy.interval(250);

    toobusy.onLag((currentLag) => {
      console.log('Event loop lag detected! Latency: ' + currentLag + 'ms');
      // throw new ServiceUnavailableException(
      //   'Service is not available right now, please try again later',
      // );
    });

    const isTooBusy = toobusy();
    if (isTooBusy) {
      // throw new ServiceUnavailableException(
      //   'Service is not available right now, please try again later',
      // );
    }

    next();
  }
}
