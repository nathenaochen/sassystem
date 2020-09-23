import { Injectable,Inject,Logger } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {userAccountDto,loginDto}  from '../dto/user.dto';
import {Roles} from '../../enums/roles.enums';
import {resData} from '../../dto/res.dto';
import {makesalt,encryptPassword} from '../../units/encrypt';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';
 
@Injectable()
export class UserService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,@InjectModel('userScheam') private readonly userAccount: Model){

  }

  //注册接口
  async register(user:userAccountDto): Promise<resData<object>>{
    const {username,password,passwordSure,type,telNum} = user;
    // console.log(new Date().getTime().toString().slice(5),'pppp');
    if(!Roles[type]){
      // throw new Error('type 参数不对，只能是STUDENT 或者 TEACHER'); 
      return resData.fail({},'type 参数不对，只能是STUDENT 或者 TEACHER','-1');
    }
    const findUser:userAccountDto = await this.userAccount.findOne({username:username});
    if(findUser){
      // throw new Error('此用户名已经注册了');
      return resData.fail({},'此用户名已经注册了','-1');
    };
    let salt = makesalt();
    const admin = new this.userAccount({
      username:username,
      tel:telNum,
      salt:salt,
      password:encryptPassword(password,salt),
      type:Roles[type],
      account:new Date().getTime().toString().slice(5),
      createdate: new Date().getTime()
    });
    const newuser:userAccountDto = await admin.save();
    return resData.success({user:{username:newuser.username,key:newuser['_id'],account:newuser.account},msg:'注册成功'},'0');
  }

  //登录接口
  async login(loginInfo:loginDto):Promise<resData<object>>{
    const {account,password} = loginInfo;
    const findUser:userAccountDto = await this.userAccount.findOne({account:account});
    if(findUser){
      const password_1 = encryptPassword(password,findUser.salt);
      if(password_1 == findUser.password){
        return resData.success({msg:'登陆成功',user:{username:findUser.username,key:findUser['_id'],account:findUser.account,type:findUser.type}},'0');
      }else{
        return resData.fail({},'密码错误','-1');
      }
    }else{
      return resData.fail({},'此用户不存在','-1');
    }
  }

  async findUserByName(loginInfo:loginDto):Promise<userAccountDto>{
    const {account,password} = loginInfo;
    const findUser:userAccountDto = await this.userAccount.findOne({account:account});
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

  async testMongo(username:string):Promise<resData<object>>{
    // console.log(await this.userAccount.findOne({username:'yt'}));
    // return this.userAccount.find();
    // return this.userAccount.findOne({username:'yt'});
    // return this.userAccount.findByIdAndUpdate({_id:'5f22969245f9de449825626a'},{username:'bob',sex:'boy'});
    const findUser:userAccountDto = await this.userAccount.findOne({username:username});
    if(findUser){
     return resData.success({user:findUser});
    }else{
      // return resData.fail({},'查无此人');
      throw new Error('查无此人');
    }
  }
}
