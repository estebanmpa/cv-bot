import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');
  const host = configService.getOrThrow<string>('host');

  app.enableCors({
    origin: configService.get<string[]>('cors.origins'),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
  });
  app.use(helmet());

  await app.listen(port, host);
  console.log(`Server running on http://${host}:${port}`);
}

bootstrap();
