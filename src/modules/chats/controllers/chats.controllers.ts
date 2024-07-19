import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatsService } from '../services/chats.services';

@Controller('chats')
export class chatsController {
    constructor(private readonly ChatsService: ChatsService) {}

    @Post('/create')
    CreateChat(){

    }

    @Delete('/delete')
    DeleteChat(){

    }

    @Get('/chat')
    GetChat(){
        
    }
}