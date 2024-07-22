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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Likes') // Tag for grouping related API endpoints in Swagger
@Controller('likes') // Base route for the likes controller
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('all') // HTTP GET method to retrieve all likes
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Get all likes', // Brief description of the operation
    description: 'Retrieves a list of all likes from the system.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all likes.', // Description for a successful retrieval
    type: [LikeEntity], // Data type returned (list of LikeEntity)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the request parameters or body.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.', // Description when no likes are found
  })
  findAllLikes(): Promise<LikeEntity[]> {
    return this.likesService.findAllLikes();
  }

  @Get('/post/:postId') // HTTP GET method to retrieve likes by post ID
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Get likes by post', // Brief description of the operation
    description: 'Retrieves a list of likes associated with the specified post ID.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved likes for the specified post.', // Description for a successful retrieval
    type: [LikeEntity], // Data type returned (list of LikeEntity)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided post ID.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found for the specified post.', // Description when no likes are found for the post
  })
  findLikesByPost(@Param('postId') postId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId);
  }

  @Get('/user/:userId') // HTTP GET method to retrieve likes by user ID
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Get likes by user', // Brief description of the operation
    description: 'Retrieves a list of likes made by the specified user ID.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved likes made by the specified user.', // Description for a successful retrieval
    type: [LikeEntity], // Data type returned (list of LikeEntity)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided user ID.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found for the specified user.', // Description when no likes are found for the user
  })
  findLikesByUser(@Param('userId') userId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId);
  }
}
