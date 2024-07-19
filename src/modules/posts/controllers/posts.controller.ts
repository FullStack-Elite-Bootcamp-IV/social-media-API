// src/modules/posts/controllers/posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  // @Get(':id')
  // findPostById(@Param('id') postId: string): Promise<PostEntity> { ... }

  // @Put(':id')
  updatePost(@Param('id') postId: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  // @Delete(':id')
  deletePost(@Param('id') postId: string): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  // @Post(':id/like')
  likePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> {
    return this.postsService.likePost(postId, userId)
  }

  // @Post(':id/unlike')
  unlikePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> {
    return this.postsService.unlikePost(postId, userId)
  }

  // @Post(':id/favorite')
  addToFavorites(@Param('id') postId: string, @Body('userId') userId: UserEntity): Promise<void> {
    return this.postsService.addToFavorites(postId, userId)
  }

  // @Delete(':id/favorite')
  removeFromFavorites(@Param('id') postId: string, @Body('userId') userId: UserEntity): Promise<void> {
    return this.postsService.removeFromFavorites(postId, userId)
  }

  // @Get('user/:userId')
  findPostsByUser(@Param('userId') userId: UserEntity): Promise<PostEntity[]> {
    return this.postsService.findPostsByUser(userId)
  }

  // @Get('user/:userId/visible')
  findPostsVisibleToUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsVisibleToUser(userId)
  }
}
