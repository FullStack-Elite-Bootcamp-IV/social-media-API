// src/modules/posts/controllers/posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @Post()
  // createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> { ... }

  // @Get(':id')
  // findPostById(@Param('id') postId: string): Promise<PostEntity> { ... }

  // @Put(':id')
  // updatePost(@Param('id') postId: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> { ... }

  // @Delete(':id')
  // deletePost(@Param('id') postId: string): Promise<void> { ... }

  // @Post(':id/like')
  // likePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> { ... }

  // @Post(':id/unlike')
  // unlikePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> { ... }

  // @Post(':id/favorite')
  // addToFavorites(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> { ... }

  // @Delete(':id/favorite')
  // removeFromFavorites(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> { ... }

  // @Get('user/:userId')
  // findPostsByUser(@Param('userId') userId: string): Promise<PostEntity[]> { ... }

  // @Get('user/:userId/visible')
  // findPostsVisibleToUser(@Param('userId') userId: string): Promise<PostEntity[]> { ... }
}
