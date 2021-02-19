import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.listen(process.env.PORT || 8080, () => {
    console.log('Normal  api: localhost:8080/api');
  });
}
startServer();
