import { NestFactory } from '@nestjs/core';
import AppModule from 'src/app/app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SentryInterceptor } from 'src/app/interceptors/sentry.interceptor'
import { HeaderInterceptor } from 'src/app/interceptors/header.interceptor'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../static'));
  app.useGlobalInterceptors(new SentryInterceptor(), new HeaderInterceptor());
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT');
  const version: string = configService.get('version');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Transport')
    .setDescription('The transport API description')
    .setVersion(version)
    .addTag('transport')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(port);
}
bootstrap();