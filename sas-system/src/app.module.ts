import { Module } from '@nestjs/common';
import {APP_GUARD,APP_PIPE,APP_INTERCEPTOR, APP_FILTER} from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {ErrorExceptionFilter} from './filter/exception.filter';

 @Module({
  imports:[UserModule,AuthModule,MongooseModule.forRoot('mongodb://localhost:27017/nestTset',{ useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
