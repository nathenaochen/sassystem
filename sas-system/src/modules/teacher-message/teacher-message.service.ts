import { Injectable,Inject, Logger } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {resData} from '../../dto/res.dto';
import {TeacherList,TeacherAllDetail,TeacherOneDetail} from './teacher-message.dto';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

@Injectable()
export class TeacherMessageService {

  constructor(@InjectModel('teacherMessageScheam') private readonly tescherMsg: Model, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger ){}

  //获取教师列表
  async getteacherList():Promise<resData<TeacherAllDetail[]>>{
    try{
      const res = await this.tescherMsg.find();
      return resData.success<TeacherAllDetail[]>(res);
    }catch(err){
      // throw new Error(err);
      this.logger.error(err.message,'error trace','error message');
      return resData.fail<TeacherAllDetail[]>([],'查找失败');
    }
    
  }

  //获取教师详情接口
  async getteacherDetail(keys: TeacherOneDetail):Promise<resData<TeacherAllDetail>>{
    // console.log(keys,'key');
    const {key} = keys;
    try{
      const res = await this.tescherMsg.findOne({key:key});
      return resData.success<TeacherAllDetail>(res);
    }catch(err){
      // throw new Error(err);
      this.logger.error(err.message,'error trace','error message');
      return resData.fail<TeacherAllDetail>({} as TeacherAllDetail,'查找失败');
    }
    
  }


  //完善信息接口
  async complete(msg: TeacherAllDetail): Promise<resData<boolean>>{
    // console.log(msg,'msg');
    try{
      const completeTeacherMessage = await this.tescherMsg.updateOne(
        { key: msg.key},
        { 
          ...msg,
          createdate: new Date().getTime()
        }
      );
      // console.log(completeTeacherMessage,'compo');
      if(completeTeacherMessage.n == 0){
        const teacherMessageInstance = new this.tescherMsg({...msg,createdate: new Date().getTime()});
        await teacherMessageInstance.save();
      }

      return resData.success<boolean>(true);
    }catch(err){
      // throw new Error();
      this.logger.error(err.message,'error trace','error message');
      return resData.fail<boolean>(true,'添加信息失败');
    }
  }
}
