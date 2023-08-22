import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { EmailModule } from '@app/email';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [AuthModule, UploadModule, EmailModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/reset-password', method: RequestMethod.POST },
        { path: '/auth/set-password', method: RequestMethod.POST },
        { path: '/auth/define-password/(.*)', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
