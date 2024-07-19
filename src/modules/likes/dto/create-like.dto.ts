import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;
}
