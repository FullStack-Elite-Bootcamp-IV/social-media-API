import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './controllers/messages.controller';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
