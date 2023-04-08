import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Ignora el atributo adicional
      forbidNonWhitelisted: true, //Alerta que hay un atributo adicional
      /* transform: true, */
    }),
  );
  await app.listen(3000);
}
bootstrap();
