// src/modules/chat/controllers/chat.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatService } from '../services/chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post()
  // createChat(@Body() createChatDto: CreateChatDto): Promise<ChatEntity> { ... }

  // @Get(':id')
  // findChatById(@Param('id') chatId: string): Promise<ChatEntity> { ... }

  // @Delete(':id')
  // deleteChat(@Param('id') chatId: string): Promise<void> { ... }

  // @Get('user/:userId')
  // findChatsByUser(@Param('userId') userId: string): Promise<ChatEntity[]> { ... }
}
