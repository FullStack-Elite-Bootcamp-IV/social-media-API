import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouritesService } from '../services/favourite.service';

@Controller('favourites')
export class chatsController {
    constructor(private readonly FavouritesService: FavouritesService) {}

    @Post('/add')
    AddFavourites(){

    }

    @Delete('/delete')
    DeletFavourites(){

    }

    @Get('/get')
    GeFavourites(){
        
    }

}