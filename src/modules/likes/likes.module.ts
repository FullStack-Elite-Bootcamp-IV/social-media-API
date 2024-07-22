import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controllers';
import { LikeEntity } from './entities/like.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Import TypeOrmModule with LikeEntity to enable repository injection
    TypeOrmModule.forFeature([LikeEntity]),
    // Import AuthModule for authentication purposes
    AuthModule
  ],
  controllers: [
    // Register LikesController for handling HTTP requests related to likes
    LikesController
  ],
  providers: [
    // Provide LikesService for business logic related to likes
    LikesService
  ],
  exports: [
    // Export LikesService to be used in other modules
    LikesService
  ],
})
export class LikesModule {}
