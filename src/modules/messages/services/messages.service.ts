import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

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

  // Function to find messages by user
  async findMessagesByUser(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.messageRepository.find({ where: [{ id: userId }] });
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to find messages by user
  async findMessagesByChat(chatId: string): Promise<void> {
    // check the promise with the messagesEntity
    try {
      if (!chatId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.messageRepository.find({ where: [{ chatId: chatId }] });
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to delete a message by ID
  async deleteMessage(messageId: string): Promise<void> {
    try {
      if (!messageId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.messageRepository.delete(messageId);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
