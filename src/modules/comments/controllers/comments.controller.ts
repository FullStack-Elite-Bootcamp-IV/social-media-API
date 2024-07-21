import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { CommentsEntity } from '../entities/comment.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

// Tag for API documentation
@ApiTags("Comments")
@Controller('comments') // Define the base route for the comments controller
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  // Endpoint to create a new comment
  @ApiResponse({
    status: 201,
    description: 'Comment added.', // Success response description
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response when request is malformed or invalid
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response for unauthorized access
  })
  @Post('/create') // HTTP POST method to create a new comment
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO, // Body of the request containing comment details
  ): Promise<CommentsEntity> {
    return this.CommentsService.createComment(createCommentDTO); // Call the service to create the comment
  }

  // Endpoint to delete a comment by ID
  @ApiResponse({
    status: 200,
    description: 'Comment deleted.', // Success response description
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response when request is malformed or invalid
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.' // Response when comment with the given ID is not found
  })
  @Delete('/delete/:id') // HTTP DELETE method to delete a comment by its ID
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.CommentsService.deleteComment(id); // Call the service to delete the comment
  }

  // Endpoint to get a comment by its ID
  @ApiResponse({
    status: 200,
    description: 'Get all Comments.', // Success response description
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response when request is malformed or invalid
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comments not found.' // Response when comments with the given ID are not found
  })
  @Get('/comment/:id') // HTTP GET method to retrieve comments by their ID
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async getCommentById(@Param('id') postId: string): Promise<CommentsEntity[]> {
    return this.CommentsService.getCommentsbyId(postId); // Call the service to get comments by ID
  }

  // Endpoint to update a comment by ID
  @ApiResponse({
    status: 200,
    description: 'Comment updated.', // Success response description
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Response when request is malformed or invalid
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.' // Response when comment with the given ID is not found
  })
  @Patch('/edit/:id') // HTTP PATCH method to update a comment by its ID
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async EditComments(
    @Param('id') id: string, // ID of the comment to be updated
    @Body() updateData: Partial<CreateCommentDTO>, // Body containing the update data
  ): Promise<CommentsEntity> {
    return this.CommentsService.updateComment(id, updateData); // Call the service to update the comment
  }
}
