// src/modules/chat/services/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  // Function to create a new chat
  // createChat(createChatDto: CreateChatDto): Promise<ChatEntity> { ... }

  // Function to find a chat by ID
  // findChatById(chatId: string): Promise<ChatEntity> { ... }

  // Function to delete a chat by ID
  // deleteChat(chatId: string): Promise<void> { ... }

  // Function to find all chats by a specific user
  // findChatsByUser(userId: string): Promise<ChatEntity[]> { ... }
}
