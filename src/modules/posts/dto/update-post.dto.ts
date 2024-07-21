import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
} from 'class-validator';

export class UpdatePostDto {

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
