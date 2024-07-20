import { Injectable } from '@nestjs/common';
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
      const newComment = this.commentsRepository.create(createCommentDTO);
      return await this.commentsRepository.save(newComment);
    }catch(e){
      console.error(e)
      throw new Error
    }
  }

  // second delete a comment
  // the name is deleteComment and the parameter is CommentsDto

  async deleteComment(id: string): Promise<void> {
    try {
      if (!isString(id)) {
        console.error('el id no es valido');
        throw new Error();
      }
      await this.commentsRepository.delete(id);
    } catch (e) {
      console.error('error en el servicio: ', e);
      throw new Error();
    }
  }

  // third get the comments
  // the name is getComments and the parameter is CommentsDto

  async getCommentsbyId(postId: string): Promise<CommentsEntity[]> {
    try {
      if (!isString(postId)) {
        console.error('el id no es valido');
        throw new Error();
      }
      return await this.commentsRepository.find({ where: { postId } });
    } catch (e) {
      console.error('error en el servicio: ', e);
      throw new Error();
    }
  }

  //update a comment
  // the name is updateComment and the parameter is CommentsDTo
  async updateComment(
    id: any,
    updateData: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    try {
      await this.commentsRepository.update(id, updateData);
      return this.commentsRepository.findOne(id);
    } catch (e) {
      console.error('error en el servicio: ', e);
      throw new Error();
    }
  }
}
