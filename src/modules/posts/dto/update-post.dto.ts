// here you must to create a post dto
import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  media?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
