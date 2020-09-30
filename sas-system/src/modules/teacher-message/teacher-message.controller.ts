import { Body, Controller,Post, UsePipes } from '@nestjs/common';
import {TeacherMessageService} from './teacher-message.service';
import {resData} from '../../dto/res.dto';
import {TeacherList,TeacherAllDetail,TeacherOneDetail} from './teacher-message.dto';
import {ParseInitPipe} from '../../pipe/parse-init.pipe';

@Controller('teacher')
@UsePipes(ParseInitPipe)
export class TeacherMessageController {
  constructor(private readonly teacherMessageService:TeacherMessageService){}
  @Post()
  index(){
    // return this.userService.testMongo();
    return 'aaa'
  }

  @Post('teacher-list')
  async teacherList(){
    // throw new ForbiddenException();
    // throw new Error('mingziguochang');
    return await this.teacherMessageService.getteacherList();
  }

  @Post('teacher-detail')
  async teacherDetail(@Body() key:TeacherOneDetail){
    // throw new ForbiddenException();
    // throw new Error('mingziguochang');
    return await this.teacherMessageService.getteacherDetail(key);
  }

  @Post('complete')
  async complete(@Body() teacherMessage:TeacherAllDetail): Promise<resData<boolean>>{
    // throw new ForbiddenException();
    // throw new Error('mingziguochang');
    return await this.teacherMessageService.complete(teacherMessage);
  }
}
