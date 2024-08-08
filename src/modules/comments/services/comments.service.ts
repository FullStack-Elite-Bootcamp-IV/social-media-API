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

  // Method to create a new comment
  async createComment(
    createCommentDTO: CreateCommentDTO,
  ): Promise<CommentsEntity> {
    try {
      // Check if the DTO is provided
      if (!createCommentDTO) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Create a new comment entity instance from the DTO
      const newComment = this.commentsRepository.create(createCommentDTO);
      // Save the new comment to the database
      return await this.commentsRepository.save(newComment);
    } catch (e) {
      // Handle errors and throw a Bad Request exception
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Method to delete a comment by ID
  async deleteComment(id: string): Promise<void> {
    try {
      // Attempt to delete the comment with the specified ID
      const erased = this.commentsRepository.delete(id).then(() => { return; });
      // Check if the comment was successfully deleted
      if (!erased) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return erased;
    } catch (e) {
      // Handle errors and throw a Bad Request exception
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Method to retrieve comments associated with a specific post ID
  async getCommentsbyId(postId: string): Promise<CommentsEntity[]> {
    try {
      // Validate that the postId is a string
      if (!isString(postId)) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Find and return comments related to the specified post ID
      return await this.commentsRepository.find({ where: { postId: postId } });
    } catch (e) {
      // Handle errors and throw a Bad Request exception
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Method to update an existing comment by ID
  async updateComment(
    id: any,
    updateData: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    try {
      // Check if the ID is provided
      if (!id) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Update the comment with the specified ID using the provided update data
      await this.commentsRepository.update(id, updateData);
      // Return the updated comment
      return this.commentsRepository.findOne({ where: { id: id } });
    } catch (e) {
      // Handle errors and throw a Bad Request exception
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
