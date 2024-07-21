import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  
  // ID of the post being liked
  @ApiProperty({
    description: 'ID of the post being liked.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  postId: string;

  // ID of the user who is liking the post
  @ApiProperty({
    description: 'ID of the user who is liking the post.',
    example: '987e6543-e21b-32d4-a567-426614174001',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
