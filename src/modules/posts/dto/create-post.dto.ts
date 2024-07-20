// here you must to create a post dto
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  // here you must to create a post dto whit the properties based on thec data base

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: UserEntity;

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
