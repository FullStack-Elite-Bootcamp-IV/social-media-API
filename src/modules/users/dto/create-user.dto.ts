import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends PartialType(UserEntity) {

  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName: string = '';

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number = 1; // pequeño hack mientras intento probar el register, cambiar en produccion

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  college?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  workPlace?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  personalWebSite?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  lastLogoutDate?: string;
}