import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {resData} from '../../dto/res.dto';

@Injectable()
export class ChatService {

  constructor(@InjectModel('messageSchema') private readonly msgModel: Model, @InjectModel('recentlyChatSchema') private readonly recentModel: Model){

  }

  async getRecentlyList(key:any):Promise<resData<any>>{
    try{
      //根据sender key查找数据，并且查找到的数据中排除_id,writedId字段。
      const reList = await this.recentModel.find({sender: key.senderKey},{_id:0,writeId:0});
      console.log(reList);
      reList.sort((a,b)=>{
        return b.date - a.date;
      });
      return resData.success(reList);
    }catch(err){
      return resData.fail({},err);
    }
  }

  async getChatDetail(body):Promise<resData<any>>{
    const {pagesize=20,senderKey, receiverKey,lastTime} = body;
    let sessionId;
    try{
      if(senderKey > receiverKey){
        sessionId = senderKey + receiverKey;
      }else{
        sessionId = receiverKey + senderKey;
      }
      const msgList = await this.msgModel.find({sessionId: sessionId});
      // console.log(msgList);
      msgList.sort((a,b)=>{
        return b.createdate - a.createdate;
      });
      if(lastTime){
        let idx = msgList.findIndex((item)=>{return item.createdate == lastTime}) + 1;
        // console.log(idx,'pp',idx + pagesize,msgList.slice(idx,pagesize));
        return resData.success(msgList.slice(idx,idx + +pagesize));
      }else{
        return resData.success(msgList.slice(0,pagesize));
      }
    }catch(err){
      return resData.fail({},err);
    }
  }
}
