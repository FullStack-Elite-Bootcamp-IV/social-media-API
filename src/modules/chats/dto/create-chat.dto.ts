// here you must to create a post dto
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chatId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user1Id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user2Id: string;

    @ApiProperty()
    @IsDate()
    lastMessage: Date;
  
  }
  