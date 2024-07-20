// here you must to create a post dto
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';
import { ChatEntity } from 'src/modules/chats/entities/chat.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreateMessageDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  messageContent: string;

  @ApiProperty()
  @IsString()
  media: string;

  @ApiProperty()
  @IsDate()
  creationTime: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chatId: string;



}
