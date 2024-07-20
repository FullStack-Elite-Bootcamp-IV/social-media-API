import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostEntity } from './entities/post.entity';
import { FollowersModule } from '../followers/followers.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]),
    FollowersModule
   ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
