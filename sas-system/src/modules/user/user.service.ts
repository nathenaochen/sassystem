import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {userAccountDto,loginDto}  from '../dto/user.dto';
import {resData} from '../../dto/res.dto';
import {makesalt,encryptPassword} from '../../units/encrypt';
// import e = require('express');
 
@Injectable()
export class UserService {
  constructor(@InjectModel('userScheam') private readonly userAccount: Model){

  }

  //注册接口
  async register(user:userAccountDto): Promise<resData<object>>{
    const {username,password,passwordSure, telNum} = user;
    if(password != passwordSure){return resData.success({msg:'两次密码不一致'});}
    const findUser:userAccountDto = await this.userAccount.findOne({username:username});
    if(findUser){return resData.success({msg:'此用户名已经注册了'});};
    let salt = makesalt();
    const admin = new this.userAccount({username:username,tel:telNum,salt:salt,password:encryptPassword(password,salt)});
    const newuser:userAccountDto = await admin.save();
    return resData.success({user:{username:newuser.username,key:newuser['_id']},msg:'注册成功'});
  }

  //登录接口
  async login(loginInfo:loginDto):Promise<resData<object>>{
    const {username,password} = loginInfo;
    const findUser:userAccountDto = await this.userAccount.findOne({username:username});
    if(findUser){
      const password_1 = encryptPassword(password,findUser.salt);
      if(password_1 == findUser.password){
        return resData.success({msg:'登陆成功',username:findUser.username,key:findUser['_id']});
      }else{
        return resData.success({msg:'密码错误'});
      }
    }else{
      return resData.success({mag:'查无此人'});
    }
  }

  async findUserByName(loginInfo:loginDto):Promise<userAccountDto>{
    const {username,password} = loginInfo;
    const findUser:userAccountDto = await this.userAccount.findOne({username:username});
    if(findUser){
      const password_1 = encryptPassword(password,findUser.salt);
      if(password_1 == findUser.password){
        return findUser;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }

  async testMongo(){
    console.log(await this.userAccount.findOne({username:'jack1'}));
    // return this.userAccount.find();
    return this.userAccount.findOne({username:'jack1'});
    // return this.userAccount.findByIdAndUpdate({_id:'5f22969245f9de449825626a'},{username:'bob',sex:'boy'});
  }
}
