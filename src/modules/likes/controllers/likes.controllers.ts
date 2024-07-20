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
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    status: 201,
    description: 'Like added.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('create')
  @UseGuards(JwtAuthGuard)
  createLike(@Body() createLikeDto: CreateLikeDto): Promise<LikeEntity> {
    return this.likesService.createLike(createLikeDto);
  }

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

  @ApiResponse({
    status: 200,
    description: 'Like deleted.',
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
    description: 'Like not found.',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteLike(@Param('id') likeId: string): Promise<void> {
    return this.likesService.deleteLike(likeId);
  }

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
  @Get('post/:postId')
  @UseGuards(JwtAuthGuard)
  findLikesByPost(@Param('postId') postId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId);
  }

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
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findLikesByUser(@Param('userId') userId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId);
  }
}
