import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comment.entity';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { isString } from 'class-validator';
import { error } from 'console';

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
    try{
      if (!createCommentDTO) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      const newComment = this.commentsRepository.create(createCommentDTO);
      return await this.commentsRepository.save(newComment);
    }catch(e){
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // second delete a comment
  // the name is deleteComment and the parameter is CommentsDto

  async deleteComment(id: string): Promise<void> {
    try {
      if (!isString(id)) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.commentsRepository.delete(id);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // third get the comments
  // the name is getComments and the parameter is CommentsDto

  async getCommentsbyId(postId: string): Promise<CommentsEntity[]> {
    try {
      if (!isString(postId)) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return await this.commentsRepository.find({ where: { postId } });
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  //update a comment
  // the name is updateComment and the parameter is CommentsDTo
  async updateComment(
    id: any,
    updateData: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    try {
      if(!id){
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.commentsRepository.update(id, updateData);
      return this.commentsRepository.findOne(id);
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
