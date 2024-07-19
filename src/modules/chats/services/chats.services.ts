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
  ) {}

  // Function to create a new chat
   createChat(createChatDto: CreateChatDto): Promise<ChatEntity> { 
      const chat = this.chatRepository.create(createChatDto)

      return this.chatRepository.save(chat)
  }

  // Function to find a chat by ID
  findChatById(chatId: string): Promise<ChatEntity> { 
    return this.chatRepository.findOneBy({ id: chatId });
  }

  // Function to delete a chat by ID
  deleteChat(chatId: string): void { 
    this.chatRepository.delete(chatId)
   }

  // Function to find all chats by a specific user
  findChatsByUser(userId: string): Promise<ChatEntity[]> {
    return this.chatRepository.find({
      where: [
        { user1Id: userId },
        { user2Id: userId },
      ],
    });
  }
}

