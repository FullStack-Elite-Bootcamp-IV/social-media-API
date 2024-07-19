import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

 // here you must to create a post dto


export class CreateCommentDTO  {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

}

