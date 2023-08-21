import { NestFactory } from '@nestjs/core';
import { Env } from '@app/shared';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(Env.openApi.title)
    .setDescription(Env.openApi.description)
    .setVersion(Env.openApi.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Env.openApi.baseUrl, app, document);

  await app.listen(Env.app.port);
}
bootstrap();
