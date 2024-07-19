import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { CommentsEntity } from '../entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Post('/create')
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<CommentsEntity> {
    return this.CommentsService.createComment(createCommentDTO);
  }

  @Delete('/delete:id')
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.CommentsService.deleteComment(id);
  }

  @Get('/comment:id')
  async getCommentById(@Param('id') postId: string): Promise<CommentsEntity[]> {
    return this.CommentsService.getCommentsbyId(postId);
  }

  @Patch('/edit:id')
  async EditComments(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCommentDTO>,
  ): Promise<CommentsEntity> {
    return this.CommentsService.updateComment(id, updateData);
  }
}
