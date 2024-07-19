import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  postId: PostEntity;

  @IsString()
  @IsNotEmpty()
  userId: UserEntity;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;
}
