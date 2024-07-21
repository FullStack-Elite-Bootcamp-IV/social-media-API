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

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}


  @ApiResponse({
    status: 201,
    description: 'Comment added.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<CommentsEntity> {
    return this.CommentsService.createComment(createCommentDTO);
  }


  @ApiResponse({
    status: 200,
    description: 'Comment deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Favorite not found.'
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.CommentsService.deleteComment(id);
  }

@ApiResponse({
    status: 200,
    description: 'Get all Comments.',
})
@ApiResponse({
    status: 400,
    description: 'Bad request.'
})  
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
@ApiResponse({
    status: 404,
    description: 'Comments not found.'
})
  @Get('/comment/:id')
  @UseGuards(JwtAuthGuard)
  async getCommentById(@Param('id') postId: string): Promise<CommentsEntity[]> {
    return this.CommentsService.getCommentsbyId(postId);
  }

  @ApiResponse({
    status: 200,
    description: 'Comment update.',
})
@ApiResponse({
    status: 400,
    description: 'Bad request.'
})  
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
@ApiResponse({
    status: 404,
    description: 'Comment not found.'
})
  @Patch('/edit/:id')
  @UseGuards(JwtAuthGuard)
  async EditComments(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCommentDTO>,
  ): Promise<CommentsEntity> {
    return this.CommentsService.updateComment(id, updateData);
  }
}
