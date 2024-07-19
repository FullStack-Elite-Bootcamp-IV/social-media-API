// src/modules/likes/controllers/likes.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LikesService } from '../services/likes.services';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

   @Post()
  createLike(@Body() createLikeDto: CreateLikeDto): Promise<LikeEntity> { 
    return this.likesService.createLike(createLikeDto);
   } 

  @Get()
  findAllLikes(): Promise<LikeEntity[]> {
    return this.likesService.findAllLikes();
  }

  @Delete(':id')
  deleteLike(@Param('id') likeId: string): Promise<void> {
    return this.likesService.deleteLike(likeId);
  }

  @Get('post/:postId')
  findLikesByPost(@Param('postId') postId: PostEntity): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId);
  }

  @Get('user/:userId')
  findLikesByUser(@Param('userId') userId: UserEntity): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId);
  }
}
