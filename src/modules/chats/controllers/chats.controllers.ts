import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatService } from '../services/chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('chat') // Define the base route for the chat controller
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Endpoint to create a new chat
  @ApiResponse({
    status: 201,
    description: 'Chat created.', // Response description for a successful chat creation
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response description for unauthorized access
  })
  @Post() // HTTP POST method to create a new chat
  createChat(@Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
    return this.chatService.createChat(createChatDto); // Call the service to create a chat
  }

  // Endpoint to get a chat by its ID
  @ApiResponse({
    status: 200,
    description: 'Get chat by ID.', // Response description for a successful chat retrieval
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response description for unauthorized access
  })
  @Get(':id') // HTTP GET method to retrieve a chat by its ID
  findChatById(@Param('id') chatId: string): Promise<ChatEntity> {
    return this.chatService.findChatById(chatId); // Call the service to find a chat by ID
  }

  // Endpoint to delete a chat by its ID
  @ApiResponse({
    status: 200,
    description: 'Chat deleted.', // Response description for a successful chat deletion
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response description for unauthorized access
  })
  @Delete(':id') // HTTP DELETE method to delete a chat by its ID
  deleteChat(@Param('id') chatId: string): Promise<void> {
    this.chatService.deleteChat(chatId); // Call the service to delete a chat by ID
    return; // Return nothing as the deletion is successful
  }

  // Endpoint to get all chats for a specific user
  @ApiResponse({
    status: 200,
    description: 'Get all chats by user.', // Response description for successfully retrieving all chats for a user
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response description for unauthorized access
  })
  @Get('user/:userId') // HTTP GET method to retrieve all chats for a specific user
  findChatsByUser(@Param('userId') userId: string): Promise<ChatEntity[]> {
    return this.chatService.findChatsByUser(userId); // Call the service to find chats by user ID
  }
}
