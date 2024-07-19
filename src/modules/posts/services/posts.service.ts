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
  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    try {
      const post = this.postRepository.create(createPostDto)
      return await this.postRepository.save(post)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to update a post by ID
  async updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    try {
      const post = this.postRepository.create(updatePostDto)
      return await this.postRepository.save(post)
    } catch (error) {
        
      }
  }

  // Function to delete a post by ID
  async deletePost(postId: string): Promise<any> {
    try {
      return await this.postRepository.delete(postId)
    } catch (error) {

    }
  }

  // Function to like a post by ID
  async likePost(postId: string, userId: string): Promise<any> {
    try {
      return await this.postRepository.increment({ id: postId }, 'likes', 1)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to unlike a post by ID
  async unlikePost(postId: string, userId: string): Promise<any> {
    try {
      return await this.postRepository.decrement({ id: postId }, 'likes', 1)
    } catch (error) {
      console.log(error)
    }
  }

  // Function to find all posts by a specific user
  async findPostsByUser(userId: UserEntity): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find({ where: { userId: userId } })
    } catch (error) {
      console.log(error)
    }
  }

  // Function to find all posts visible to a specific user (public posts and posts of followed users)
  async findPostsVisibleToUser(userId: string): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find({ where: { isPublic: true } })
    } catch (error) {
      console.log(error)
    }
  }
}
