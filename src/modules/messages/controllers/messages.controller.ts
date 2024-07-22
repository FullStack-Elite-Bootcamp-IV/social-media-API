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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a message',
    description: 'Sends a new message and returns the created message.',
  })
  @ApiResponse({
    status: 201,
    description: 'Message sent.',
    type: MessageEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get('/chat/:chatId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Find messages by chat ID',
    description: 'Retrieves all messages associated with the given chat ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
    type: [MessageEntity],
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
  findMessagesByChat(@Param('chatId') chatId: string): Promise<void> {
    return this.messagesService.findMessagesByChat(chatId);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a message',
    description: 'Deletes a message specified by its ID.',
  })
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
  deleteMessage(@Param('id') messageId: string): Promise<void> {
    return this.messagesService.deleteMessage(messageId);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Find messages by user ID',
    description: 'Retrieves all messages sent by the user with the given ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all messages.',
    type: [MessageEntity],
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
  async findMessagesByUser(@Param('userId') userId: string): Promise<void> {
    return this.messagesService.findMessagesByUser(userId);
  }
}
