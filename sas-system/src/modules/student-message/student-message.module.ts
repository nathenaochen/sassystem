import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {StudentMessageController} from './student-message.controller';
import {StudentMessageService} from './student-message.service';
import {StudentMessage} from './student-message.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'studentMessageScheam', schema: StudentMessage,collection:'studentmessage'}])],
  controllers: [StudentMessageController],
  providers:[StudentMessageService],
  exports:[StudentMessageModule]
})
export class StudentMessageModule {}
