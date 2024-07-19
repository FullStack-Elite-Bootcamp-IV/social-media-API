/* import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { CommentsEntity } from '../entities/comment.entity';
import { CommentsDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentsRepository: Repository<CommentsEntity>
    ) {}

    // Here is the services of user 

    // first create a comment
        // IN this service i need a function to add a post in comment
    // the name is addComment and the parameter is CommentsDto

    async addComment(comment: CommentsDto) {
    }

    // second delete a comment
    // the name is deleteComment and the parameter is CommentsDto

    async deleteComment(comment: CommentsDto) {
    }

    // third get the comments
    // the name is getComments and the parameter is CommentsDto

    async getComments (comment: CommentsDto) {
    }

    //update a comment
    // the name is updateComment and the parameter is CommentsDTo
    async updateComment (comment: CommentsDto) {
    }

} */