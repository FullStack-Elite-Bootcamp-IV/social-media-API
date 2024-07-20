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
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Messages")
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // create a message
  @ApiResponse({
    status: 201,
    description: 'Message sent.',
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
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messagesService.createMessage(createMessageDto);
  }

  // find messages by chat id
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Messages not found.'
  })
  @Get(':chatId')
  findMessagesByChat(@Param('chatId') chatId: string): Promise<void> {
    return this.messagesService.findMessagesByChat(chatId);
  }

  // delete a message by id
  @ApiResponse({
    status: 200,
    description: 'Message deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found.'
  })
  @Delete(':id')
  deleteMessage(@Param('id') messageId: string): Promise<void> {
    return this.messagesService.deleteMessage(messageId);
  }

  //find message by user id
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Messages not found.'
  })
  @Get(':userId')
  async findMessagesByUser(@Param('userId') userId: string): Promise<void> {
    return this.messagesService.findMessagesByUser(userId);
  }
}
