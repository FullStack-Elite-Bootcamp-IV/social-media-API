import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controllers';
import { FollowersEntity } from './entities/followers.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Import TypeOrmModule and configure it to use FollowersEntity
    TypeOrmModule.forFeature([FollowersEntity]),

    // Import AuthModule for authentication-related functionalities
    AuthModule,
  ],
  controllers: [
    // Register the FollowersController
    FollowersController,
  ],
  providers: [
    // Register the FollowersService
    FollowersService,
  ],
  exports: [
    // Export FollowersService for use in other modules
    FollowersService,
    
    // Export TypeOrmModule to allow other modules to use it
    TypeOrmModule,
  ],
})
export class FollowersModule {}
