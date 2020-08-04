import {IsString,MinLength,maxLength, isString, IsInt, IsOptional, IsNotEmpty} from 'class-validator';

export class userAccountDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @MinLength(6)
  @IsNotEmpty()
  passwordSure: string;

  telNum?: number;

  salt?: string;

}

export class loginDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

}