// here you must to create a post dto
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @ApiProperty()
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
