import { Controller, Get, Post, Body, ForbiddenException, UsePipes, Param, Query } from '@nestjs/common';
import {UserService} from './user.service';
import {ApiTags} from '@nestjs/swagger';
import {userAccountDto, loginDto} from '../dto/user.dto';
import {ParseInitPipe} from '../../pipe/parse-init.pipe';
import {resData} from '../../dto/res.dto';

@Controller('user')
@ApiTags('user')
@UsePipes(ParseInitPipe)
export class UserController {
  constructor(private readonly userService : UserService){}
  @Get()
  index(){
    // return this.userService.testMongo();
    return 'aaa'
  }

  @Get('getuser')
  getUser(@Query() query){
    // console.log(query);
    return this.userService.testMongo(query.username);
  }

  @Post('register')
  async register(@Body() user: userAccountDto): Promise<resData<object>>{
    // throw new ForbiddenException();
    // throw new Error('mingziguochang');
    return await this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: loginDto): Promise<resData<object>>{
    // throw new ForbiddenException();
    // throw new Error('mingziguochang');
    return await this.userService.login(user);
  }
}
