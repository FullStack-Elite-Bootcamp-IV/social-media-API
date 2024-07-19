import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get(':chatId')
  findMessagesByChat(@Param('chatId') chatId: string): Promise<void> {
    return this.messagesService.findMessagesByChat(chatId);
  }

  @Delete(':id')
  deleteMessage(@Param('id') messageId: string): Promise<void> {
    return this.messagesService.deleteMessage(messageId);
  }

  @Get(':userId')
  async findMessagesByUser(@Param('userId') userId: string): Promise<void> {
    return this.messagesService.findMessagesByUser(userId);
  }
}
