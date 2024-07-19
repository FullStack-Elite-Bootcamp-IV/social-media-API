import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouritesService } from '../services/favourite.service';

@Controller('chats')
export class chatsController {
    constructor(private readonly FavouritesService: FavouritesService) {}

    @Post('/add')
    AddFavourites(){

    }

    @Delete('/delete')
    DeletFavourites(){

    }

    @Get('Favourites')
    GeFavourites(){
        
    }

}