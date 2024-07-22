import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'ID of the user creating the post.',
    example: 'user-1234',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Title of the post.',
    example: 'My First Post',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Description of the post.',
    example: 'This is a description of the post.',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL of media associated with the post.',
    example: 'http://example.com/media.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  media?: string;

  @ApiProperty({
    description: 'Visibility status of the post.',
    example: true,
    required: false
  })
  @IsBoolean()
  isPublic?: boolean;
}
