import { Module } from '@nestjs/common';
import {APP_GUARD,APP_PIPE,APP_INTERCEPTOR, APP_FILTER} from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './modules/user/user.module';
import {ChatModule} from './modules/chat/chat.module';
import {TeacherMessageModule} from './modules/teacher-message/teacher-message.module';
import {FileUploadModule} from './modules/file-upload/file-upload.module';
import {AuthModule} from './modules/auth/auth.module';
import {StudentMessageModule} from './modules/student-message/student-message.module';
import {ErrorExceptionFilter} from './filter/exception.filter';
import {InterceptorInterceptor} from './interceptor/interceptor.interceptor';
import {WinstonModule,utilities} from 'nest-winston';
import winston = require('winston');
import winstonDailyRotateFile = require('winston-daily-rotate-file');
import os = require('os');

if(os.platform() == 'win32'){
  if(process.env.NODE_ENV == 'development'){
    process.env.LOG_PATH = './log';
  }
}

 @Module({
    imports:[UserModule,AuthModule,TeacherMessageModule,ChatModule,StudentMessageModule,FileUploadModule,MongooseModule.forRoot('mongodb://39.99.174.23:27017/tutor',{ useNewUrlParser: true,useCreateIndex:true }),
      WinstonModule.forRoot({
        format:winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        level:'http',
        exitOnError:false,
        // levels:winston.config.syslog.levels,
        // silent:false,
        transports:[
          process.env.NODE_ENV == 'development' && new winston.transports.Console({
            format:winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike()
            ),
          }),
          new winston.transports.File({
            filename:process.env.LOG_PATH + '/err.log',
            // dirname:process.env.LOG_PATH,
            level: 'error',
            handleExceptions:true,
            maxsize: 1024 * 1024 * 10 //最大10兆
          }),
          new winstonDailyRotateFile({
            filename: process.env.LOG_PATH + '/all.log',
            // dirname:process.env.LOG_PATH,
            level:'info',
            handleExceptions:true,
            // maxSize: 1024 * 1024 * 10 //最大10兆
            // maxsize:
            // json:true
          })
        ]
      })
  ],
  controllers: [AppController],
  providers: [AppService,{provide:APP_FILTER,useClass:ErrorExceptionFilter},{provide:APP_INTERCEPTOR,useClass:InterceptorInterceptor}],
})
export class AppModule {}
