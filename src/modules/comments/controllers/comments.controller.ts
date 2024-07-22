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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

// Tag for API documentation
@ApiTags("Comments")
@Controller('comments') // Define the base route for the comments controller
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  // Endpoint to create a new comment
  @ApiOperation({
    summary: 'Create a new comment', // Brief description of the operation
    description: 'Creates a new comment and returns the created comment.', // Detailed description
  })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully added. Returns the created comment.', // Description for a successful creation response
    type: CommentsEntity, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @Post('/create') // HTTP POST method to create a new comment
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO, // Body of the request containing comment details
  ): Promise<CommentsEntity> {
    return this.CommentsService.createComment(createCommentDTO); // Call the service to create the comment
  }

  // Endpoint to delete a comment by ID
  @ApiOperation({
    summary: 'Delete a comment by its ID', // Brief description of the operation
    description: 'Deletes a specific comment using its ID.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully deleted.', // Description for a successful deletion response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided ID.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.', // Description when the comment with the given ID is not found
  })
  @Delete('/delete/:id') // HTTP DELETE method to delete a comment by its ID
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.CommentsService.deleteComment(id); // Call the service to delete the comment
  }

  // Endpoint to get comments by the post ID
  @ApiOperation({
    summary: 'Get comments by post ID', // Brief description of the operation
    description: 'Retrieves all comments for a specific post using its ID and returns the details of the comments.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Comments successfully retrieved. Returns a list of comments.', // Description for a successful retrieval response
    type: [CommentsEntity], // Data type returned (a list of CommentsEntity)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided ID.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comments not found.', // Description when comments with the given ID are not found
  })
  @Get('/comment/:id') // HTTP GET method to retrieve comments by their post ID
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  async getCommentById(@Param('id') postId: string): Promise<CommentsEntity[]> {
    return this.CommentsService.getCommentsbyId(postId); // Call the service to get comments by post ID
  }

  // Endpoint to update a comment by ID
  @ApiOperation({
    summary: 'Update a comment by its ID', // Brief description of the operation
    description: 'Updates a specific comment using its ID and returns the updated comment.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully updated. Returns the updated comment.', // Description for a successful update response
    type: CommentsEntity, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.', // Description when the comment with the given ID is not found
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
