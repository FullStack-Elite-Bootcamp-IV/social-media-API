// here you must tyo create the user dto

import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends PartialType(UserEntity) {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  age?: number;

  @ApiProperty()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @IsString()
  coverImage?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  college?: string;

  @ApiProperty()
  @IsString()
  workPlace?: string;

  @ApiProperty()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsString()
  personalWebSite?: string;
}