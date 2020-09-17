import {IsString,MinLength,maxLength, isString, IsInt, IsOptional, IsNotEmpty} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class userAccountDto {
  @ApiProperty({description: '用户名',example:'lilei'})
  @IsNotEmpty()
  username: string;

  @ApiProperty({description: '密码', example:'111111'})
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({description: '确认密码',example:'111111'})
  @MinLength(6)
  @IsNotEmpty()
  passwordSure: string;

  @ApiProperty({description: '角色类型',example:'student'})
  @IsNotEmpty()
  type: string;

  @ApiProperty({description: '电话号码'})
  telNum?: number;

  salt?: string;
  account?: number;

}

export class loginDto {
  @ApiProperty({description: '用户名',example:'lilei'})
  @IsNotEmpty()
  username: string;

  @ApiProperty({description: '密码', example:'111111'})
  @MinLength(6)
  @IsNotEmpty()
  password: string;

}