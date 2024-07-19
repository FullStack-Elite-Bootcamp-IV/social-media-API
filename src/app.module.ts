// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatModule } from './modules/chats/chats.module';
import { FollowersModule } from './modules/followers/followers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DatabaseConfig } from './config/database.config';
import { JwtConfig } from './config/jwt.config';
import { SocketConfig } from './config/socket.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FavouritesModule,
    MessagesModule,
    ChatModule,
    FollowersModule,
    NotificationsModule,
    JwtConfig,
    SocketConfig,
  ],
})
export class AppModule {}
