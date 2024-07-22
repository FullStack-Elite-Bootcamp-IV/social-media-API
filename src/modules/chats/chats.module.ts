import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './services/chats.service';
import { ChatController } from './controllers/chats.controllers';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { ChatGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, JwtService],
  exports: [ChatService],
})
export class ChatModule {}


