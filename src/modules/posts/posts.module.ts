import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostEntity } from './entities/post.entity';
import { FollowersModule } from '../followers/followers.module';
import { UserEntity } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { LikesModule } from '../likes/likes.module';
import { LikeEntity } from '../likes/entities/like.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]),
    FollowersModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule, LikesModule, 
    TypeOrmModule.forFeature([LikeEntity])
   ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
