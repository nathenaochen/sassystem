import { Controller, Get, Post, Body } from '@nestjs/common';
import {UserService} from './user.service';
import {userAccountDto} from '../dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService : UserService){}
  @Get()
  index(): string{
    return 'aaa'
  }

  @Post('register')
  async register(@Body() user): Promise<userAccountDto>{
    // console.log(user);
    return await this.userService.create(user)
    // return '11'
  }
}
