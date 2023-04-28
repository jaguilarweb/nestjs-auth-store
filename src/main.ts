import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Ignora el atributo adicional
      forbidNonWhitelisted: true, //Alerta que hay un atributo adicional
      /* transform: true, */
      transformOptions: {
        enableImplicitConversion: true, //Todos los queries param que tengan numero los transforma
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API Store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
