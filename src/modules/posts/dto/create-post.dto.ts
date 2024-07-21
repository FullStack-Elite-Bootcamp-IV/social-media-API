// here you must to create a post dto
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreatePostDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  media?: string;

  @ApiProperty()
  @IsBoolean()
  isPublic?: boolean;
}
