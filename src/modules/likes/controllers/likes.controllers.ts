// src/modules/likes/controllers/likes.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LikesService } from '../services/likes.services';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  /* @Post("")
  createLike(@Body() createLikeDto: CreateLikeDto): Promise<LikeEntity> { ... } */

  // @Get()
  // findAllLikes(): Promise<LikeEntity[]> { ... }

  // @Delete(':id')
  // deleteLike(@Param('id') likeId: string): Promise<void> { ... }

  // @Get('post/:postId')
  // findLikesByPost(@Param('postId') postId: string): Promise<LikeEntity[]> { ... }

  // @Get('user/:userId')
  // findLikesByUser(@Param('userId') userId: string): Promise<LikeEntity[]> { ... }
}
