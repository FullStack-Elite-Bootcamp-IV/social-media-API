// here you must to create a post dto
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';
import { ChatEntity } from 'src/modules/chats/entities/chat.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreateMessageDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  messageContent: string;

  @IsString()
  media: string;

  @IsDate()
  creationTime: Date;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;



}
