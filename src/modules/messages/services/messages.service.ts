import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  // Function to create a new message
  // createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> { ... }

  // Function to find all messages
  // findAllMessages(): Promise<MessageEntity[]> { ... }

  // Function to delete a message by ID
  // deleteMessage(messageId: string): Promise<void> { ... }

  // Function to find messages by chat ID
  // findMessagesByChat(chatId: string): Promise<MessageEntity[]> { ... }

  // Function to find messages by user ID
  // findMessagesByUser(userId: string): Promise<MessageEntity[]> { ... }
}
