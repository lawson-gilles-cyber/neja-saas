import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  try {
    console.log('BOOTSTRAP STARTED');

    const app = await NestFactory.create(AppModule);

    console.log('APP CREATED');

    app.use(helmet());

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api/v1');

    const port = Number(process.env.PORT) || 4000;

    await app.listen(port, '0.0.0.0');

    console.log(`APP RUNNING ON PORT ${port}`);
  } catch (err) {
    console.error('BOOTSTRAP ERROR');
    console.error(err);
  }
}

bootstrap();
