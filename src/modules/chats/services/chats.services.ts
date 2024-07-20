// src/modules/chat/services/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';
import { UUID } from 'crypto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) { }

  // Function to create a new chat
  createChat(createChatDto: CreateChatDto): Promise<ChatEntity> {
    try {
      if (!createChatDto) {
        throw new Error('Chat not created, please complete the form')
      }
      const chat = this.chatRepository.create(createChatDto)
      if (!chat) throw new Error('Chat not created')
      return this.chatRepository.save(chat)
    }
    catch (error) {
      throw error
    }
  }

  // Function to find a chat by ID
  findChatById(chatId: string): Promise<ChatEntity> {
    try {
      if (!chatId) throw new Error('Chat not found');

      const chat = this.chatRepository.findOneBy({ id: chatId });

      if (!chat) throw new Error('Chat not found');
      return chat;
    }
    catch (error) {
      throw error
    }
  }

  // Function to delete a chat by ID
  deleteChat(chatId: string): void {
    try {
      const chat = this.chatRepository.delete(chatId)
      if (!chat) {
        throw new Error('Chat not found');
      }
      return;
    } catch (error) {
      throw new Error('Chat not found');
    }
  }

  // Function to find all chats by a specific user
  findChatsByUser(userId: string): Promise<ChatEntity[]> {
    try {
      const chats = this.chatRepository.find({
        where: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      });
      if (!chats) {
        throw new Error('Chat not found');
      }
      return chats;
    } catch (error) {
      throw new Error('Chat not found');
    }
  }

}