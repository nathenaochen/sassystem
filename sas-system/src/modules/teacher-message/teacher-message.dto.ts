import {IsString,MinLength,maxLength, isString, IsInt, IsOptional, IsNotEmpty} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class TeacherAllDetail {
  @ApiProperty({description: '账号'})
  @IsNotEmpty()
  account: string;

  @ApiProperty({description: '用户id'})
  @IsNotEmpty()
  key:string;

  @ApiProperty({description: '用户名'})
  name?: string;

  @ApiProperty({description: '性别'})
  sex: string;

  @ApiProperty({description: '空余时间'})
  free_time: string;

  @ApiProperty({description: '毕业学校'})
  school_tag: string;

  @ApiProperty({description: '学历'})
  degree: string;

  @ApiProperty({description: '做家教年限'})
  teaching_time: string;

  @ApiProperty({description: '期望收费'})
  charge: string;

  @ApiProperty({description: '期望教学年级'})
  teach_class: string;

  @ApiProperty({description: '教学科目'})
  teach_project: string;

  @ApiProperty({description: '用户头像'})
  header_img: string;

  @ApiProperty({description: '教学等级'})
  teacher_level: string;

  @ApiProperty({description: '在学校获得荣誉'})
  gethonor: string;

  @ApiProperty({description: '个人简介'})
  personal_introl: string;

  @ApiProperty({description: '教学特点'})
  teach_feature: string;

  @ApiProperty({description: '座右铭'})
  zuoyouming: string;


}

export class TeacherOneDetail {
  @ApiProperty({description: '用户id'})
  @IsNotEmpty()
  key: string;

}



export interface TeacherList {
  account: string,
  key:string,
  name: string,
  sex: string,
  free_time: string,
  school_tag: string,
  degree: string,
  teaching_time: string,
  charge: string,
  teach_class: string,
  teach_project: string,
  header_img: string,
  teacher_level: string,
}