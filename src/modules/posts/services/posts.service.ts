import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostsService { 
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    // Function to create a new post
    // createPost(createPostDto: CreatePostDto): Promise<PostEntity> { ... }

    // Function to update a post by ID
    // updatePost(postId: string, updatePostDto: CreatePostDto): Promise<PostEntity> { ... }

    // Function to delete a post by ID
    // deletePost(postId: string): Promise<void> { ... }

    // Function to like a post by ID
    // likePost(postId: string, userId: string): Promise<void> { ... }

    // Function to unlike a post by ID
    // unlikePost(postId: string, userId: string): Promise<void> { ... }

    // Function to add a post to favorites
    // addToFavorites(postId: string, userId: string): Promise<void> { ... }

    // Function to remove a post from favorites
    // removeFromFavorites(postId: string, userId: string): Promise<void> { ... }

    // Function to find all posts by a specific user
    // findPostsByUser(userId: string): Promise<PostEntity[]> { ... }

    // Function to find all posts visible to a specific user (public posts and posts of followed users)
    // findPostsVisibleToUser(userId: string): Promise<PostEntity[]> { ... }
}
