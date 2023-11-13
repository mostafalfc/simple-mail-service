import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configuration().rmq.url],
      queue: configuration().rmq.queue,
      noAck: false,
      prefetchCount: 1,
    },
  });
  app.startAllMicroservices();
}
bootstrap();
