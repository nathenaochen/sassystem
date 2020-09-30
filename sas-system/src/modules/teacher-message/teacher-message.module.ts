import { Module } from '@nestjs/common';
import { TeacherMessageService } from './teacher-message.service';
import {MongooseModule} from '@nestjs/mongoose';
import {TeacherMessage} from './teacher-message.schema';
import { TeacherMessageController } from './teacher-message.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'teacherMessageScheam', schema: TeacherMessage,collection:'teachermessage'}])],
  providers: [TeacherMessageService],
  controllers: [TeacherMessageController],
  exports: [TeacherMessageService]
})
export class TeacherMessageModule {}
