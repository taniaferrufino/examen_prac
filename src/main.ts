import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  //Configuración de CORS (Vital para que el frontend se conecte
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de AutoSale')
    .setDescription('API para la gestión de vehículos en AutoSale')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`API ejecutándose en el puerto: ${port}`);
  console.log(`Documentación disponible en: /api/docs`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
