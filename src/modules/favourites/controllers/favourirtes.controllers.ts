import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouritesService } from '../service/favourite.service';

@Controller('favourites')
export class FavouritesController {
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