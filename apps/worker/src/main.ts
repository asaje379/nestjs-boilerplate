import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { CustomLogger } from '@app/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule, { bufferLogs: true });

  const logger = app.get(CustomLogger);
  logger.setApp('worker');
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Worker API documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
