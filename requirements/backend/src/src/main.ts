import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("/api");
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  const herokuKeepAwake = require("heroku-keep-awake");
  herokuKeepAwake.wakeDyno("https://tfrs-backend.herokuapp.com/");
  await app.listen(PORT);
}
bootstrap();
