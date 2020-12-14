import {IsString,MinLength,maxLength, isString, IsInt, IsOptional, IsNotEmpty} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class StudentMessageDto {
  @ApiProperty({description: '账号'})
  @IsNotEmpty()
  account: string;
  @ApiProperty({description: '用户id'})
  @IsNotEmpty()
  key:string;
  @ApiProperty({description: '姓名'})
  name: string;
  @ApiProperty({description: '性别'})
  sex: string;
  @ApiProperty({description: '上课时间'})
  free_time: string;
  @ApiProperty({description: '在读年级'})
  class: string;
  @ApiProperty({description: '补课科目'})
  subject: string;
  @ApiProperty({description: '头像'})
  header_img: string;
  @ApiProperty({description: '支付费用'})
  charge: string;
  @ApiProperty({description: '对教师要求'})
  request:string;
  @ApiProperty({description: '座右铭'})
  zuoyouming: string;

}

export class StudentDetailDto {
  @ApiProperty({description: '用户id'})
  @IsNotEmpty()
  key:string;

}