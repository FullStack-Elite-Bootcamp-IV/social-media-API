import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controllers';
import { FollowersEntity } from './entities/followers.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersEntity]),
  AuthModule],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService, TypeOrmModule],
})
export class FollowersModule {}
