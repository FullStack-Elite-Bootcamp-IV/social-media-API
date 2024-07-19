import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavouritesService } from '../service/favourite.service';
import { FavouritesDto } from '../dto/create-favourite.dto';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("Favourites")
@Controller('favourites')
export class FavouritesController {
    constructor(private readonly FavouritesService: FavouritesService) {}

    @ApiResponse({
        status: 201,
        description: 'Se ha añadido el favorito.',
      })
      @ApiResponse({
        status: 400,
        description: 'Solicitud incorrecta.'
      })
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