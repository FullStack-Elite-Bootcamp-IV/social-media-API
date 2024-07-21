import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from "src/modules/users/entities/user.entity";

// Data Transfer Object (DTO) for authentication
export class AuthDTO {

  @ApiProperty({
    description: 'The user\'s email address.',
    example: 'user@example.com'
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsEmail() // Validate that the field is a valid email
  email: string;

  @ApiProperty({
    description: 'The user\'s password.',
    example: 'password123',
    minLength: 8
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsString() // Validate that the field is a string
  @MinLength(8) // Validate that the field has a minimum length of 8 characters
  password: string;
}

// DTO for user registration
export class RegisterDTO {

  @ApiProperty({
    description: 'The user\'s username.',
    example: 'johndoe'
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsString() // Validate that the field is a string
  userName: string;

  @ApiProperty({
    description: 'The user\'s email address.',
    example: 'user@example.com'
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsEmail() // Validate that the field is a valid email
  @IsString() // Validate that the field is a string
  email: string;

  @ApiProperty({
    description: 'The user\'s password.',
    example: 'password123',
    minLength: 8
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsString() // Validate that the field is a string
  @MinLength(8) // Validate that the field has a minimum length of 8 characters
  password: string;

  @ApiProperty({
    description: 'The user\'s full name.',
    example: 'John Doe',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  fullName: string;

  @ApiProperty({
    description: 'The user\'s age.',
    example: 30,
    required: false
  })
  @IsNumber() // Validate that the field is a number
  @IsPositive() // Validate that the number is positive
  @IsOptional() // Validate that the field is optional
  age?: number;

  @ApiProperty({
    description: 'The user\'s gender.',
    enum: Gender,
    example: Gender.MALE,
    required: false
  })
  @IsEnum(Gender) // Validate that the field is one of the enum values
  gender?: Gender;

  @ApiProperty({
    description: 'The URL of the user\'s profile image.',
    example: 'https://example.com/profile.jpg',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  profileImage?: string;

  @ApiProperty({
    description: 'The URL of the user\'s cover image.',
    example: 'https://example.com/cover.jpg',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  coverImage?: string;

  @ApiProperty({
    description: 'A brief description about the user.',
    example: 'Software developer with a passion for open source.',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  description?: string;

  @ApiProperty({
    description: 'The name of the user\'s college.',
    example: 'MIT',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  college?: string;

  @ApiProperty({
    description: 'The name of the user\'s workplace.',
    example: 'Google',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  workPlace?: string;

  @ApiProperty({
    description: 'The user\'s location.',
    example: 'New York',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  location?: string;

  @ApiProperty({
    description: 'The URL of the user\'s personal website.',
    example: 'https://johndoe.com',
    required: false
  })
  @IsOptional() // Validate that the field is optional
  @IsString() // Validate that the field is a string
  personalWebSite?: string;

  @ApiProperty({
    description: 'The date of the user\'s last logout.',
    example: '2023-07-21T12:00:00Z',
    required: false
  })
  @IsDateString() // Validate that the field is a valid date string
  @IsOptional() // Validate that the field is optional
  lastLogoutDate?: string;
}

// DTO for logout request
export class LogoutDTO {
  @ApiProperty({
    description: 'The date of logout.',
    example: '2023-07-21T12:00:00Z'
  })
  @IsNotEmpty() // Validate that the field is not empty
  date: string;

  @ApiProperty({
    description: 'The user\'s email address.',
    example: 'user@example.com'
  })
  @IsNotEmpty() // Validate that the field is not empty
  @IsEmail() // Validate that the field is a valid email
  email: string;
}
