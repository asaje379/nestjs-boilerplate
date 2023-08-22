import { ACTION_NAME } from '@app/decorators';
import { PrismaService } from '@app/prisma';
import { ExecutionRequest } from '@app/shared';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as chalk from 'chalk';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as ExecutionRequest;
    const reflector = new Reflector();

    return next.handle().pipe(
      map((data: any) => {
        const action = reflector.get(ACTION_NAME, context.getHandler());
        this.prisma.httpLog
          .create({
            data: {
              action: action ?? 'Action inconnue',
              method: req.method,
              url: req.originalUrl,
              authorId: req.auth?.id ?? data.credentials?.id,
              query: req.query,
              params: req.params,
              body: req.body,
              ip: req.ip,
            },
          })
          .catch((e) => {
            console.log(
              chalk.redBright(
                `[ERROR] - ${
                  HttpLogInterceptor.name
                } - ${new Date().toLocaleString()} ${e.message}`,
              ),
            );
          });

        return data;
      }),
    );
  }
}
