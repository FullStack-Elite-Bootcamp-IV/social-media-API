import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}

export class LogoutDTO{
  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}