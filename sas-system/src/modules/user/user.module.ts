import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {userAccountScheam} from './user.schema';
import {UserService} from './user.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'userScheam', schema: userAccountScheam,collection:'account'}])],
  providers:[UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
