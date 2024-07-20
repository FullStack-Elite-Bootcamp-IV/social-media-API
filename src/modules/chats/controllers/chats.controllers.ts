
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatService } from '../services/chats.services';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiResponse({
    status: 201,
    description: 'Chat created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Post()
  createChat(@Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
    return this.chatService.createChat(createChatDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get chat by ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Get(':id')
  findChatById(@Param('id') chatId: string): Promise<ChatEntity> {
    return this.chatService.findChatById(chatId);
  }

  @ApiResponse({
    status: 200,
    description: 'Chat deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Delete(':id')
  deleteChat(@Param('id') chatId: string): Promise<void> {
    this.chatService.deleteChat(chatId);
    return;
  }


  @ApiResponse({
    status: 200,
    description: 'Get all chats by user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Get('user/:userId')
  findChatsByUser(@Param('userId') userId: string): Promise<ChatEntity[]> {
    return this.chatService.findChatsByUser(userId);
  }
}