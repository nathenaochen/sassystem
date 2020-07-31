import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {userAccountDto}  from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('userScheam') private readonly userAccount: Model){

  }

   async create(user:userAccountDto): Promise<userAccountDto>{
    const admin = new this.userAccount(user);
    const user1 =  await admin.save();
    console.log(user1,user);
    return user1;
  }

}
