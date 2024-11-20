import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with default settings (open to all domains)
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unwanted properties
      forbidNonWhitelisted: true, // Rejects requests with unknown properties
      transform: true, // Automatically transforms payloads to DTO classes
      errorHttpStatusCode: 400, // Sets the HTTP status code for validation errors
      exceptionFactory: (errors) => {
        return {
          statusCode: 400,
          message: errors.map(err => Object.values(err.constraints || {}).join(', ')),
          error: 'Bad Request',
        };
      },
    }),
  );

  await app.listen(5000, '0.0.0.0');
}
bootstrap();
