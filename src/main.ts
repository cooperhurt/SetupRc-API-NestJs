import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Setup RC Api')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('Setup RC')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/documentation', app, document);

  app.use(bodyParser.json());
  app.listen(process.env.PORT || 8080, () => {
    console.log('Normal  api: localhost:8080/api');
  });
}
startServer();
