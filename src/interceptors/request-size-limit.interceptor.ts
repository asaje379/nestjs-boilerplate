import { REQUEST_SIZE_LIMIT_NAME } from '@app/decorators/request-limit-size.decorator';
import { Env, ExecutionRequest } from '@app/shared';
import { countBytes } from '@app/shared/helpers';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RequestLimitSizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as ExecutionRequest;

    const reflector = new Reflector();
    const limit =
      reflector.get(REQUEST_SIZE_LIMIT_NAME, context.getHandler()) ??
      Env.security.requestSizeLimit;
    const bytes = countBytes(limit);

    console.log(
      bytes,
      limit,
      req.socket.bytesRead,
      req.socket.bytesRead > bytes,
    );

    if (req.socket.bytesRead <= bytes) return next.handle();

    throw new PayloadTooLargeException('Request size is too large');
  }
}
