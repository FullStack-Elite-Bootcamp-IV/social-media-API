import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

// Data Transfer Object for creating a comment
export class CreateCommentDTO {

  @ApiProperty({
    description: 'The ID of the user who is making the comment',
    example: 'user-123',
    required: true
  })
  @IsNotEmpty() // Ensure this field is not empty
  @IsString() // Ensure this field is a string
  userId: string; // User ID of the person making the comment

  @ApiProperty({
    description: 'The ID of the post the comment is associated with',
    example: 'post-456',
    required: true
  })
  @IsNotEmpty() // Ensure this field is not empty
  @IsString() // Ensure this field is a string
  postId: string; // ID of the post where the comment is made

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
    required: true
  })
  @IsNotEmpty() // Ensure this field is not empty
  @IsString() // Ensure this field is a string
  content: string; // Content of the comment
}
