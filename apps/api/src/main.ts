// # Khởi động Nest + CORS (code EN, chú thích VI)
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Không setGlobalPrefix => route là /products
  await app.listen(process.env.PORT || 4000);
  console.log('API listening on http://localhost:' + (process.env.PORT || 4000));
}
bootstrap();
