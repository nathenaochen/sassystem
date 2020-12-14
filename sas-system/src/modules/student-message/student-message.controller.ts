import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import {ParseInitPipe} from '../../pipe/parse-init.pipe';
import {resData} from '../../dto/res.dto';
import {StudentMessageService} from './student-message.service';
import {StudentMessageDto,StudentDetailDto} from './student-message.dto';


@Controller('student')
@UsePipes(ParseInitPipe)
export class StudentMessageController {
  constructor(private readonly studentMessageService: StudentMessageService){}

  //完善学生信息接口
  @Post('complete')
  async complete(@Body() studentMsg: StudentMessageDto){
    return await this.studentMessageService.complete(studentMsg);
  }

  //获取学生信息列表
  @Post('studentlist')
  async getStudentList(){
    return await this.studentMessageService.getStudentList();
  }

  //获取学生信息列表
  @Post('studentdetail')
  async getStudentListByKey(@Body() key : StudentDetailDto){
    return await this.studentMessageService.getStudentDetail(key);
  }

}
