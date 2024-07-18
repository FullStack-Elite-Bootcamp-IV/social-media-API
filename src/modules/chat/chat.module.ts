// I need that yoo make all aplication

import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controllers';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { UserModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity]), UserModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}