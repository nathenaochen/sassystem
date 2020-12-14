import { Injectable,Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {resData} from '../../dto/res.dto';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';
import {StudentMessageDto,StudentDetailDto} from './student-message.dto';

@Injectable()
export class StudentMessageService {
  constructor(@InjectModel('studentMessageScheam') private readonly studentMsg: Model, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger ){}

  async complete(studentMsgInfo:StudentMessageDto): Promise<resData<boolean>>{
    try{
      const completeStudentMessage = await this.studentMsg.updateOne(
        { key: studentMsgInfo.key},
        { 
          ...studentMsgInfo,
          createdate: new Date().getTime()
        }
      );
      // console.log(completeTeacherMessage,'compo');
      if(completeStudentMessage.n == 0){
        const studentMessageInstance = new this.studentMsg({...studentMsgInfo,createdate: new Date().getTime()});
        await studentMessageInstance.save();
      }
      return resData.success<boolean>(true);
    }catch(err){
      // throw new Error();
      this.logger.error(err.message,'error trace','error message');
      return resData.fail<boolean>(true,'添加信息失败');
    }
  }

  async getStudentList():Promise<resData<any>>{
    try{
      const studentlist = await this.studentMsg.find();
      return resData.success(studentlist)

    }catch(err){
      this.logger.error(err.message,'error trace','error message');
      return resData.fail({} ,'查找失败');
    }
  }

  async getStudentDetail(key:StudentDetailDto):Promise<resData<any>>{
    // console.log(key,'key');
    try{
      const res = await this.studentMsg.findOne({key:key.key});
      return resData.success(res);
    }catch(err){
      this.logger.error(err.message,'error trace','error message');
      return resData.fail({} ,'查找失败');
    }

  }
}
