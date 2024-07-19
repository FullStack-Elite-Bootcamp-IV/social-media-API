import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PostsService { 
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  // Function to create a new post
  createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    try {
      const post = this.postRepository.create(createPostDto)
      return this.postRepository.save(post)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to update a post by ID
  updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    try {
      const post = this.postRepository.create(updatePostDto)
        return this.postRepository.save(post)
    } catch (error) {
        
      }
  }

  // Function to delete a post by ID
  deletePost(postId: string): Promise<any> {
    try {
      return this.postRepository.delete(postId)
    } catch (error) {

    }
  }

  // Function to like a post by ID
  likePost(postId: string, userId: string): Promise<any> {
    try {
      return this.postRepository.increment({ id: postId }, 'likes', 1)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to unlike a post by ID
  unlikePost(postId: string, userId: string): Promise<any> {
    try {
      return this.postRepository.decrement({ id: postId }, 'likes', 1)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to add a post to favorites
  addToFavorites(postId: string, userId: UserEntity): Promise<any> {
    try {
      return this.postRepository.update(postId, userId)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to remove a post from favorites
  removeFromFavorites(postId: string, userId: UserEntity): Promise<any> {
    try {
      return this.postRepository.update(postId, { userId: null })
    } catch (error) {
      console.log(error)
    }
  }

  // Function to find all posts by a specific user
  findPostsByUser(userId: UserEntity): Promise<PostEntity[]> {
    try {
      return this.postRepository.find({ where: { userId: userId } })
    } catch (error) {
      console.log(error)
    }
  }

  // Function to find all posts visible to a specific user (public posts and posts of followed users)
  findPostsVisibleToUser(userId: string): Promise<PostEntity[]> {
    try {
      return this.postRepository.find({ where: { isPublic: true } })
    } catch (error) {
      console.log(error)
    }
  }
}
