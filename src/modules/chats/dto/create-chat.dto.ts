// here you must to create a post dto
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';

export class CreateChatDto {

    @IsString()
    @IsNotEmpty()
    chatId: string;

    @IsString()
    @IsNotEmpty()
    user1Id: string;

    @IsString()
    @IsNotEmpty()
    user2Id: string;

    @IsDate()
    lastMessage: Date;
  
  }
  