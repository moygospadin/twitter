import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';

import { ExceptionFilter, exceptionFactory } from '../../../libs/exceptions/src';

import { Config } from './config';
import { ServiceTwitterModule } from './service-twitter.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(ServiceTwitterModule);

  app.use(cookieParser());

  app.use(graphqlUploadExpress());
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
      forbidUnknownValues: false,
      transform: true,
    }),
  );

  const configService = app.get<ConfigService<Config>>(ConfigService);
  const { port } = configService.get('application');

  await app.listen(port);

  logger.log(`Twitter service is running on ${await app.getUrl()}`, 'bootstrap');
}

bootstrap();
