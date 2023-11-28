import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from '@app/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpInterceptor } from '@app/http-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(CustomLogger);
  logger.setApp('core');
  app.useLogger(logger);

  app.useGlobalInterceptors(new HttpInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Core API documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
