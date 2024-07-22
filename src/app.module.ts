import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './modules/users/user.module';
import { PostsModule } from './modules/posts/posts.module';
import { LikesModule } from './modules/likes/likes.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { MessagesModule } from './modules/messages/messages.module';
import { FollowersModule } from './modules/followers/followers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chats/chats.module';
import { CommentsModule } from './modules/comments/comments.module';
import { UploadModule } from './modules/aws/upload.module';

@Module({
  imports: [
    // Configure and load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,  // Make configuration available across the app
      envFilePath: '.env',  // Path to the environment file
      validationSchema: Joi.object({
        // Define validation rules for environment variables
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        // Uncomment and add validation for JWT variables if needed
        /* JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(), */
        PORT: Joi.number(),  // Optional PORT variable
      }),
    }),
    // Configure TypeORM to connect to the PostgreSQL database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule for configuration
      inject: [ConfigService],  // Inject ConfigService to access environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',  // Use PostgreSQL database
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Path to entity files
        synchronize: true,  // Synchronize database schema with entities (false in production)
      }),
    }),
    // Import application modules
    UsersModule,
    AuthModule,
    PostsModule,
    LikesModule,
    FavouritesModule,
    MessagesModule,
    FollowersModule,
    NotificationsModule,
    ChatModule,
    CommentsModule,
    UploadModule
  ],
})
export class AppModule {}
