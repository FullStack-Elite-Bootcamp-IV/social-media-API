import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>
  ) {}

  // Function to create a new like
  // createLike(createLikeDto: CreateLikeDto): Promise<LikeEntity> { ... }
  
  // Function to find all likes
  // findAllLikes(): Promise<LikeEntity[]> { ... }
  
  // Function to delete a like by ID
  // deleteLike(likeId: string): Promise<void> { ... }

  // Function to find likes by post ID
  // findLikesByPost(postId: string): Promise<LikeEntity[]> { ... }

  // Function to find likes by user ID
  // findLikesByUser(userId: string): Promise<LikeEntity[]> { ... }
}
