import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Endpoint to get all likes
  @ApiResponse({
    status: 200,
    description: 'Get all likes.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAllLikes(): Promise<LikeEntity[]> {
    return this.likesService.findAllLikes();
  }

  // Endpoint to get likes by post ID
  @ApiResponse({
    status: 200,
    description: 'Get likes by post.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('/post/:postId')
  @UseGuards(JwtAuthGuard)
  findLikesByPost(@Param('postId') postId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId);
  }

  // Endpoint to get likes by user ID
  @ApiResponse({
    status: 200,
    description: 'Get likes by user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  findLikesByUser(@Param('userId') userId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId);
  }
}
