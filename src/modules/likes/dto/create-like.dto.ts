import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
