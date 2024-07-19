// here you must to create a post dto
import {
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  media: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  @IsDate()
  publicationDate: Date;

  @IsNotEmpty()
  @IsDate()
  updateDate: Date;

  @IsNotEmpty()
  @IsNumber()
  likes: number;
}
