import {
  IsString,
  IsDateString,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {

  @ApiProperty({
    description: 'The ID of the first user participating in the chat',
    example: 'user-id-1',
    required: true
  })
  @IsString() // Validate that the value is a string
  @IsNotEmpty() // Validate that the value is not empty
  user1Id: string;

  @ApiProperty({
    description: 'The ID of the second user participating in the chat',
    example: 'user-id-2',
    required: true
  })
  @IsString() // Validate that the value is a string
  @IsNotEmpty() // Validate that the value is not empty
  user2Id: string;

  @ApiProperty({
    description: 'The timestamp of the last message in the chat',
    example: '2024-07-21T18:45:00Z',
    required: true
  })
  @IsDateString() // Validate that the value is a valid ISO 8601 date string
  lastMessage?: string; // Make this field optional
}
