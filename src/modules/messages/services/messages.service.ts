import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  //throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  // Function to create a new message
  createMessage(createMessageDto: DeepPartial<CreateMessageDto>) {
    try {
      if (!createMessageDto) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      const message = this.messageRepository.create(createMessageDto);
      return this.messageRepository.save(message);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to find all messages
  findAllMessagesByChat(chatId: string): Promise<MessageEntity[]> {
    try {
      if (!chatId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return this.messageRepository.find({ where: [{ chatId: chatId }] });
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to delete a message by ID
  deleteMessage(messageId: string) {
    try {
      if (!messageId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      this.messageRepository.delete(messageId);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
