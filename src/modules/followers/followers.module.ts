import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controller';
import { FollowerEntity } from './entities/follower.entity'; */

@Module({
  /* imports: [TypeOrmModule.forFeature([FollowerEntity])], */
  /* controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService], */
})
export class FollowersModule {}
