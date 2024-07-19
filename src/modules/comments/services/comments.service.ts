/* import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { CommentsEntity } from '../entities/comment.entity';
import { CreateCommentDTO, DeleteCommentDTO } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

  // Here is the services of user

  // first create a comment
  // IN this service i need a function to add a post in comment
  // the name is addComment and the parameter is CommentsDto

  async createComment(
    createCommentDTO: CreateCommentDTO,
  ): Promise<CommentsEntity> {
    const newComment = this.commentsRepository.create(createCommentDTO);
    return await this.commentsRepository.save(newComment);
  }

  // second delete a comment
  // the name is deleteComment and the parameter is CommentsDto

  async deleteComment(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  // third get the comments
  // the name is getComments and the parameter is CommentsDto

  async getComments(): Promise<CommentsEntity[]> {
    return this.commentsRepository.find();
  }

  //update a comment
  // the name is updateComment and the parameter is CommentsDTo
  async updateComment(id: any, updateData: Partial<CommentsEntity>): Promise<CommentsEntity> {
    await this.commentsRepository.update(id, updateData);
    return this.commentsRepository.findOne(id);
  }
}