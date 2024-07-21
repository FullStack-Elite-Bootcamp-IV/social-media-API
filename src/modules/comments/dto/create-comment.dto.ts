import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateCommentDTO  {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

}

