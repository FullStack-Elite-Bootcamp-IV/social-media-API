import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
} from 'class-validator';

export class UpdatePostDto {

  @ApiProperty({
    description: 'Updated title of the post.',
    example: 'Updated Post Title',
    required: false
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Updated description of the post.',
    example: 'This is the updated description of the post.',
    required: false
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Updated URL of media associated with the post.',
    example: 'http://example.com/updated-media.jpg',
    required: false
  })
  @IsString()
  media?: string;

  @ApiProperty({
    description: 'Updated visibility status of the post.',
    example: false,
    required: false
  })
  @IsBoolean()
  isPublic?: boolean;
}
