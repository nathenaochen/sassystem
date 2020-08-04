import { Module } from '@nestjs/common';
import { PassportModule } from'@nestjs/passport';
import { JwtModule } from'@nestjs/jwt';
import {UserModule} from '../user/user.module';
import { AuthService } from './auth.service';
import {AuthController} from './auth.controller';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),JwtModule.register({
    secret: 'secrit',
    signOptions: { expiresIn: '60s' }, // token 过期时效
  }),
  UserModule
],
  providers: [AuthService,JwtStrategy],
  controllers:[AuthController]
})
export class AuthModule {
}
