import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {

  @ApiProperty({
    description: 'Content of the message.',
    example: 'Hello, how are you?',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  messageContent: string;

  @ApiProperty({
    description: 'Optional media associated with the message (e.g., image URL).',
    example: 'http://example.com/media/image.jpg',
    required: false
  })
  @IsString()
  media?: string;

  @ApiProperty({
    description: 'Timestamp when the message was created.',
    example: '2024-07-21T12:34:56Z',
    required: true
  })
  @IsDate()
  @IsNotEmpty()
  creationTime: Date;

  @ApiProperty({
    description: 'User ID of the message sender.',
    example: 'user-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    description: 'Chat ID to which the message belongs.',
    example: 'chat-456',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  chatId: string;
}
