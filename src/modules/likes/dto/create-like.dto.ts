import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
export class CreateLikeDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postId: PostEntity;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: UserEntity;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  creationDate: Date;
}
