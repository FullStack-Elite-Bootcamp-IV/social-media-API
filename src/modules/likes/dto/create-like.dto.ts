import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from '../../posts/entities/post.entity';
import { UserEntity } from '../../users/entities/user.entity';
export class CreateLikeDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
