import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './controllers/messages.controller';
import { MessageEntity } from './entities/message.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Import the TypeOrmModule with the MessageEntity to enable interaction with the 'messages' table.
    TypeOrmModule.forFeature([MessageEntity]),
    // Import AuthModule to use authentication guards or other auth-related functionalities.
    AuthModule
  ],
  controllers: [
    // Register the MessagesController to handle incoming requests related to messages.
    MessagesController
  ],
  providers: [
    // Register the MessagesService to provide business logic and interact with the repository.
    MessagesService
  ],
  exports: [
    // Export MessagesService to make it available in other modules if needed.
    MessagesService
  ]
})
export class MessagesModule {}
