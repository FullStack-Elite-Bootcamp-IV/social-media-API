import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './services/chats.service';
import { ChatController } from './controllers/chats.controllers';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { ChatGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, MessageEntity]), // Import TypeOrmModule with the ChatEntity and MessageEntity
  ],
  controllers: [
    ChatController, // Declare the ChatController
  ],
  providers: [
    ChatService, // Provide the ChatService
    ChatGateway, // Provide the ChatGateway
    JwtService
  ],
  exports: [
    ChatService, // Export the ChatService for use in other modules
    JwtService
  ],
})
export class ChatModule {}
