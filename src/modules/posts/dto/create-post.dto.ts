// here you must to create a post dto
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @IsNotEmpty()
  @IsString()
  userId: UserEntity;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  media?: string;

  @IsBoolean()
  isPublic?: boolean;
}
