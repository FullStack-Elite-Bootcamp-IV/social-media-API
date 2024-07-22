import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object (DTO) for user data
export class UserDto extends PartialType(UserEntity) {

  @ApiProperty({
    description: 'Username of the user.',
    example: 'john_doe',
    required: false
  })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Email address of the user.',
    example: 'john.doe@example.com',
    required: false
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of the user. Must be at least 8 characters long.',
    example: 'password123',
    required: false
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
    required: false
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Age of the user. Must be a positive number.',
    example: 30,
    required: false
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Gender of the user.',
    enum: Gender,
    required: false
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'URL of the user\'s profile image.',
    example: 'http://example.com/profile.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({
    description: 'URL of the user\'s cover image.',
    example: 'http://example.com/cover.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({
    description: 'A brief description about the user.',
    example: 'Software Developer with 5 years of experience.',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'College or university the user attended.',
    example: 'University of Example',
    required: false
  })
  @IsOptional()
  @IsString()
  college?: string;

  @ApiProperty({
    description: 'User\'s workplace.',
    example: 'Example Corp.',
    required: false
  })
  @IsOptional()
  @IsString()
  workPlace?: string;

  @ApiProperty({
    description: 'Location of the user.',
    example: 'New York, USA',
    required: false
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Personal website URL of the user.',
    example: 'http://johnswebsite.com',
    required: false
  })
  @IsOptional()
  @IsString()
  personalWebSite?: string;

  @ApiProperty({
    description: 'Dark mode boolean',
    example: 'true',
    required: false
  })
  @IsOptional()
  @IsBoolean()
  darkMode: boolean

  @ApiProperty({
    description: 'Date when the user last logged out.',
    example: '2024-07-21T13:45:30Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  lastLogoutDate?: string;
}
