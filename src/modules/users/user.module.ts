import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PostEntity } from '../posts/entities/post.entity';
import { FollowersEntity } from '../followers/entities/followers.entity';
import { FollowersModule } from '../followers/followers.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), 
    JwtModule, FollowersModule,
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([FollowersEntity]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
