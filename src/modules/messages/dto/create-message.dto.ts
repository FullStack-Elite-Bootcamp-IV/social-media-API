// here you must to create a post dto
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    @IsNotEmpty()
    chatId: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    media: string;

    @IsDate()
    creationTime: Date;
  }
  