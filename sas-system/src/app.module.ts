import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './modules/user/user.module'

 @Module({
  imports:[UserModule,MongooseModule.forRoot('mongodb://localhost:27017/nestTset')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
