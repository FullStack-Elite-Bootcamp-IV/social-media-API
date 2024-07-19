import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavouritesService } from '../service/favourite.service';
import { FavouritesDto } from '../dto/create-favourite.dto';

@Controller('favourites')
export class FavouritesController {
    constructor(private readonly FavouritesService: FavouritesService) {}

    
    @Post('/add')
    public async AddFavourites(@Body() body: FavouritesDto){
        return await this.FavouritesService.addFavourite(body);
    }

    @Delete('/delete')
    public async DeleteFavourites(@Param('id') id: any){
        return await this.FavouritesService.deleteFavourite(id);
    }

    @Get('/get')
    public async GeFavourites(@Param('userId') userId: string){
        return await this.FavouritesService.getFavourites(userId);
        
    }

}