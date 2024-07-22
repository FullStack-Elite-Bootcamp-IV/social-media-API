import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
//import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //const jwtService = app.get(JwtService);
  //app.useGlobalGuards(new JwtAuthGuard(jwtService));

  // Configuración global de prefijos de rutas
  app.setGlobalPrefix('api');

  // Usar un ValidationPipe global para validar DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // lanza un error si hay propiedades no definidas en el DTO
    transform: true, // transforma los objetos entrantes a sus tipos definidos en el DTO
  }));

  const config = new DocumentBuilder()
  .setTitle('API (read the description)')
  .setDescription('CRUD application, Please note: the examples do not have real IDs, they are invented')
  .setVersion('3.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  // CORS (Cross-Origin Resource Sharing) habilitado
  app.enableCors();

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
