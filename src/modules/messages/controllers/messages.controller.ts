import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post()
  // createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageEntity> { ... }

  // @Get()
  // findAllMessages(): Promise<MessageEntity[]> { ... }

  // @Delete(':id')
  // deleteMessage(@Param('id') messageId: string): Promise<void> { ... }

  // @Get('chat/:chatId')
  // findMessagesByChat(@Param('chatId') chatId: string): Promise<MessageEntity[]> { ... }

  // @Get('user/:userId')
  // findMessagesByUser(@Param('userId') userId: string): Promise<MessageEntity[]> { ... }
}
