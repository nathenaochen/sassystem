import { Controller, Get, UseGuards, Post, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ApiTags,ApiBearerAuth} from '@nestjs/swagger';
import {resData} from '../../dto/res.dto';
import {loginDto} from '../dto/user.dto';
import {AuthService} from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Get()
  indexFun(){
    return 'aaa'
  }

  @Post('get_token')
  async gettoken(@Body() loginInfo: loginDto):Promise<resData<object>>{
    return await this.authService.createToken(loginInfo);
  }

  @Post('validate_token')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async validateToken(@Request() Req):Promise<resData<object>>{
    console.log(Req.user);
    if(Req.user.username){
      return resData.success(Req.user)
    }else{
      throw new Error('token认证失败');
    }
  }

}
