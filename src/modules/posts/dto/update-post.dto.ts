// here you must to create a post dto
import {
  IsString,
  IsBoolean,
} from 'class-validator';

export class UpdatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  media?: string;

  @IsBoolean()
  isPublic?: boolean;
}
