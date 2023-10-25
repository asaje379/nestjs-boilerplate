import { NestFactory } from '@nestjs/core';
import { Env } from '@app/shared';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpLogInterceptor } from './interceptors/http-log.interceptor';
import { PrismaService } from '@app/prisma';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new HttpLogInterceptor(new PrismaService()));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'dist/templates/views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(Env.openApi.title)
    .setDescription(Env.openApi.description)
    .setVersion(Env.openApi.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Env.openApi.baseUrl, app, document);

  await app.listen(Env.app.port);
}
bootstrap();
