import {
  Module
} from '@nestjs/common';
import {
  TypeOrmModule
} from '@nestjs/typeorm';
import {
  PostsService
} from './services/posts.service';
import {
  PostsController
} from './controllers/posts.controller';
import {
  PostEntity
} from './entities/post.entity';
import {
  FollowersModule
} from '../followers/followers.module';
import {
  UserEntity
} from '../users/entities/user.entity';
import {
  AuthModule
} from '../auth/auth.module';
import {
  LikesModule
} from '../likes/likes.module';
import {
  LikeEntity
} from '../likes/entities/like.entity';
import{
  FavouritesEntity
}from '../favourites/entities/favourites.entity'
import{
  FavouritesModule
}from '../favourites/favourites.module'

@Module({
  imports: [
    // Import TypeOrmModule with the entities used in this module
    TypeOrmModule.forFeature([
      PostEntity,
      UserEntity,
      LikeEntity,
      FavouritesEntity
    ]),

    // Import other modules
    FollowersModule,
    AuthModule,
    LikesModule,
    FavouritesModule
  ],
  controllers: [
    PostsController
  ],
  providers: [
    PostsService
  ],
  exports: [
    PostsService
  ]
})
export class PostsModule {}
