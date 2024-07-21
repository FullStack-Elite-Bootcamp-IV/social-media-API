import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comment.entity';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { isString } from 'class-validator';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

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

  async deleteComment(id: string): Promise<void> {
    try {
      const erased = this.commentsRepository.delete(id).then(() => { return });
      console.log("colo")
      if (!erased) {
        console.log("no colo")
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return erased
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

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

  async updateComment(
    id: any,
    updateData: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    try {
      if(!id){
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.commentsRepository.update(id, updateData);
      return this.commentsRepository.findOne({where: { id: id }});
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
