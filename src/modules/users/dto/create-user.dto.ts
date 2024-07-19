// here you must tyo create the user dto

import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends PartialType(UserEntity) {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNumber()
  @IsPositive()
  age?: number;

  @IsString()
  gender?: string;

  @IsString()
  profileImage?: string;

  @IsString()
  coverImage?: string;

  @IsString()
  description?: string;

  @IsString()
  college?: string;

  @IsString()
  workPlace?: string;

  @IsString()
  location?: string;

  @IsString()
  personalWebSite?: string;
}