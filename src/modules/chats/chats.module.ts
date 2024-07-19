import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './services/chats.service';
import { ChatController } from './controllers/chats.controller';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from '../messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
