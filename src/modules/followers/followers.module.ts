import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controllers';
import { FollowersEntity } from './entities/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersEntity])],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService], */
})
export class FollowersModule {}
