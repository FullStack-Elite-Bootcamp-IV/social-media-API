import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Messages')
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
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messagesService.createMessage(createMessageDto);
  }

  // Find messages by chat id
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Messages not found.',
  })
  @Get('/chat/:chatId')
  @UseGuards(JwtAuthGuard)
  findMessagesByChat(@Param('chatId') chatId: string): Promise<void> {
    return this.messagesService.findMessagesByChat(chatId);
  }

  // Delete a message by id
  @ApiResponse({
    status: 200,
    description: 'Message deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found.',
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteMessage(@Param('id') messageId: string): Promise<void> {
    return this.messagesService.deleteMessage(messageId);
  }

  //Find message by user id
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Messages not found.',
  })
  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  async findMessagesByUser(@Param('userId') userId: string): Promise<void> {
    return this.messagesService.findMessagesByUser(userId);
  }
}
