import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { formatRequest } from './utils';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;

    console.log(
      request.socket.address(),
      request.socket.remoteAddress,
      request.headers,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.warn(formatRequest(request));
      }),
    );
  }
}
