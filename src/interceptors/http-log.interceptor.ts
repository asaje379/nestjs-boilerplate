import { ACTION_NAME } from '@app/decorators';
import { logger, stdoutLogger } from '@app/logger';
import { PrismaService } from '@app/prisma';
import { ExecutionRequest } from '@app/shared';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const req = context.switchToHttp().getRequest() as ExecutionRequest;
    const reflector = new Reflector();

    return next.handle().pipe(
      map((data: any) => {
        const action = reflector.get(ACTION_NAME, context.getHandler());
        const end = Date.now();
        const info = {
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
          duration: `${end - start} ms`,
          action: action ?? 'Action inconnue',
          method: req.method,
          url: req.originalUrl,
          authorId: req.auth?.id ?? data.credentials?.id,
          query: req.query,
          params: req.params,
          body: req.body,
          ip: req.ip,
        } as any;
        logger.log.info(JSON.stringify(info));
        this.prisma.httpLog.create({ data: info }).catch((e) => {
          stdoutLogger.log.error(e.message);
          logger.log.error(e.message);
        });

        return data;
      }),
    );
  }
}
