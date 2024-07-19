import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { ChatEntity } from 'src/modules/chats/entities/chat.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { DeepPartial } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}


  // TO DO: Realizar validaciones

  // Function to create a new message
  createMessage(createMessageDto: DeepPartial<CreateMessageDto>) { 
    const message = this.messageRepository.create(createMessageDto)
    return this.messageRepository.save(message)
 }

  // Function to find all messages
  findAllMessagesByChat(chatId : string): Promise<MessageEntity[]> { 
    return this.messageRepository.find({ where: [ { chatId: chatId } ] } )
   }

  // Function to delete a message by ID
  deleteMessage(messageId: string) { 
    this.messageRepository.delete(messageId)
  }

}
