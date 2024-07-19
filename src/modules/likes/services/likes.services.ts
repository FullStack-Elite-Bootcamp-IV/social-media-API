import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  // Function to create a new like
  createLike(createLikeDto: CreateLikeDto): Promise<LikeEntity> {
    try {
      return this.likeRepository.save(createLikeDto);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to find all likes
  findAllLikes(): Promise<LikeEntity[]> {
    try {
      return this.likeRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete a like by ID
  deleteLike(likeId: string): Promise<void> {

    try{
      return this.likeRepository.delete(likeId).then(() => {
        return;
      });
    }
    catch(error){
      console.log(error);
    }
  }

  // Function to find likes by post ID
  findLikesByPost(postId: PostEntity): Promise<LikeEntity[]> {

    try{
      return this.likeRepository.find({ where: { postId: postId } });
    }
    catch(error){
      console.log(error);
    }
  }

  // Function to find likes by user ID
  findLikesByUser(userId: UserEntity): Promise<LikeEntity[]> {
    try {
      return this.likeRepository.find({ where: { userId: userId } });
    } catch (error) {
      console.log(error);
    }
  }
}
