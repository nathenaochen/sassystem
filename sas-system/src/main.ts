import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder,} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //生成api接口文档  swagger文档
  const option = new DocumentBuilder()
  .setTitle('SSO Program')
  .setDescription('SSO NestJs Program')
  .addBearerAuth()
  .addTag('Api')
  .setVersion('0.00.001')
  .build()
  const doc = SwaggerModule.createDocument(app,option);
  SwaggerModule.setup('sso-doc',app,doc);
  await app.listen(3000);
}
bootstrap();
