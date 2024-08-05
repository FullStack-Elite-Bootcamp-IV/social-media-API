import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  // Function to find all likes
  async findAllLikes(): Promise<LikeEntity[]> {
    try {
      // Retrieve all like entities from the database
      const likes = await this.likeRepository.find();
      
      // Check if any likes are found
      if (!likes || likes.length === 0) {
        throw new Error('Likes not found');
      }
      return likes;
    } catch (error) {
      // Handle errors and throw a new error with the message
      throw new Error(error.message);
    }
  }

  // Function to find likes by post ID
  async findLikesByPost(postId: string): Promise<LikeEntity[]> {
    try {
      // Retrieve likes associated with the specified post ID
      const likes = await this.likeRepository.find({ where: { postId: postId } });
      
      // Check if any likes are found
      if (likes) {
        return likes;
      } else {
        throw new Error('Likes not found');
      }
    } catch (error) {
      // Handle errors and throw a new error with the message
      throw new Error(error.message);
    }
  }

  // Function to find likes by user ID
  async findLikesByUser(userId: string): Promise<LikeEntity[]> {
    try {
      // Retrieve likes associated with the specified user ID
      const likes = await this.likeRepository.find({ where: { userId } });
      
      // Check if any likes are found
      if (!likes || likes.length === 0) {
        throw new Error('Likes not found');
      }
      return likes;
    } catch (error) {
      // Handle errors and throw a new error with the message
      throw new Error(error.message);
    }
  }
}
