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
  async createChat(createChatDto: CreateChatDto): Promise<ChatEntity> {
    try {
      if (!createChatDto) {
        throw new Error('Chat not created, please complete the form'); // Check if createChatDto is provided
      }
      
      const chat = this.chatRepository.create(createChatDto); // Create a new chat entity
      if (!chat) throw new Error('Chat not created'); // Check if chat creation was successful
      return await this.chatRepository.save(chat); // Save the chat entity and return it
    } catch (error) {
      throw error; // Throw any errors encountered
    }
  }

  // Function to find a chat by ID
  async findChatById(chatId: string): Promise<ChatEntity> {
    try {
      if (!chatId) throw new Error('Chat not found'); // Check if chatId is provided

      const chat = await this.chatRepository.findOneBy({ chatId: chatId }); // Find the chat by ID

      if (!chat) throw new Error('Chat not found'); // Check if chat was found
      return chat; // Return the found chat
    } catch (error) {
      throw error; // Throw any errors encountered
    }
  }

  // Function to delete a chat by ID
  async deleteChat(chatId: string): Promise<void> {
    try {
      const result = await this.chatRepository.delete(chatId); // Delete the chat by ID
      if (result.affected === 0) {
        throw new Error('Chat not found'); // Check if the chat was found and deleted
      }
      return;
    } catch (error) {
      throw new Error('Chat not found'); // Throw an error if chat deletion fails
    }
  }

  // Function to find all chats by a specific user
  async findChatsByUser(userId: string): Promise<ChatEntity[]> {
    try {
      const chats = await this.chatRepository.find({
        where: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      }); // Find all chats where the user is either user1 or user2
      if (!chats.length) {
        return []; // Check if any chats were found
      }
      return chats; // Return the found chats
    } catch (error) {
      throw new Error('Chats not found'); // Throw an error if chat finding fails
    }
  }
}
