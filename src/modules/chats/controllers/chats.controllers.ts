import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatService } from '../services/chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('chat') // Define the base route for the chat controller
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Endpoint to create a new chat
  @ApiOperation({
    summary: 'Create a new chat', // Brief description of the operation
    description: 'Creates a new chat between two users and returns the created chat.', // Detailed description
  })
  @ApiResponse({
    status: 201,
    description: 'Chat successfully created. Returns the created chat.', // Description for a successful creation response
    type: ChatEntity, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @Post() // HTTP POST method to create a new chat
  createChat(@Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
    return this.chatService.createChat(createChatDto); // Call the service to create a chat
  }

  // Endpoint to get a chat by its ID
  @ApiOperation({
    summary: 'Get a chat by its ID', // Brief description of the operation
    description: 'Retrieves a specific chat using its ID and returns the chat details.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Chat successfully retrieved. Returns the chat details.', // Description for a successful retrieval response
    type: ChatEntity, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided ID.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @Get(':id') // HTTP GET method to retrieve a chat by its ID
  findChatById(@Param('id') chatId: string): Promise<ChatEntity> {
    return this.chatService.findChatById(chatId); // Call the service to find a chat by ID
  }

  // Endpoint to delete a chat by its ID
  @ApiOperation({
    summary: 'Delete a chat by its ID', // Brief description of the operation
    description: 'Deletes a specific chat using its ID.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Chat successfully deleted.', // Description for a successful deletion response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided ID.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @Delete(':id') // HTTP DELETE method to delete a chat by its ID
  deleteChat(@Param('id') chatId: string): Promise<void> {
    this.chatService.deleteChat(chatId); // Call the service to delete a chat by ID
    return; // Return nothing as the deletion is successful
  }

  // Endpoint to get all chats for a specific user
  @ApiOperation({
    summary: 'Get all chats for a user', // Brief description of the operation
    description: 'Retrieves all chats involving a specific user using their ID.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Chats successfully retrieved. Returns a list of chats.', // Description for a successful retrieval response
    type: [ChatEntity], // Data type returned (a list of ChatEntity)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided user ID.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @Get('user/:userId') // HTTP GET method to retrieve all chats for a specific user
  findChatsByUser(@Param('userId') userId: string): Promise<ChatEntity[]> {
    return this.chatService.findChatsByUser(userId); // Call the service to find chats by user ID
  }
}
