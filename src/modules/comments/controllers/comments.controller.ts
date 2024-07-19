import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../services/chats.services';

@Controller('chats')
export class chatsController {
    constructor(private readonly CommentsService: CommentsService) {}

    @Post('/create')
    CreateComment(){

    }

    @Delete('/delete')
    DeleteComment(){

    }

    @Get('/comments')
    GetComments(){
        
    }

    @Patch('/edit')
    EditComments(){
        
    }
}