import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { EmailModule } from '@app/email';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';
import { routesToExclude } from './app.route-exclude';
import { TodoModule } from '../todo/todo.module';
import { TooBusyMiddleware } from 'src/middlewares/too-busy.middleware';

@Module({
  imports: [AuthModule, UploadModule, EmailModule, PrismaModule, TodoModule],
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
      .apply(TooBusyMiddleware, AuthMiddleware)
      .exclude(...routesToExclude)
      .forRoutes('*');
  }
}
