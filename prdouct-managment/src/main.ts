import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('apis/v1');
  const options = new DocumentBuilder()
    .setTitle('Product Management APIs Documentation')
    .setDescription(
      'This page contains the documentation for all the APIs associated with this project',
    )
    .setVersion('1.0')
    .addTag('product-management')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4444);
}

bootstrap();
