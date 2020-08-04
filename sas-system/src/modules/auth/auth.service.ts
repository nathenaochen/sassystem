import { Injectable } from '@nestjs/common';
import {resData} from '../../dto/res.dto';
import {loginDto,userAccountDto} from '../dto/user.dto';
import {UserService} from '../user/user.service';
import { JwtService } from'@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService,private readonly jwtService:JwtService){}
  async createToken(LoginInfo:loginDto):Promise<resData<object>>{
    const user: userAccountDto = await this.userService.findUserByName(LoginInfo);
    if(user){
      const {username} = user;
      const payload = {username:username,key:user['_id']}
      const toaken = this.jwtService.sign(payload);
      return resData.success({token: toaken});
    }else{
      return resData.success({msg:'认证失败'});
    }

  }
}
