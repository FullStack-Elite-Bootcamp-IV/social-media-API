// here i need to create the posts service

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


    // here i need to create a post
    createPost(post: CreatePostDto) {
    }


    // here i need to get all posts
    getPosts() {
    }

    
}