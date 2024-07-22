import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { CommentsEntity } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  // Import TypeOrmModule with CommentsEntity to allow interaction with the comments database table
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]), // Registers CommentsEntity with TypeORM
    AuthModule, // Imports AuthModule for authentication functionality (e.g., guards)
  ],
  // Register CommentsController to handle incoming requests related to comments
  controllers: [CommentsController],
  // Register CommentsService to provide business logic and interact with the database
  providers: [CommentsService],
  // Export CommentsService so it can be used by other modules
  exports: [CommentsService],
})
export class CommentsModule {}
