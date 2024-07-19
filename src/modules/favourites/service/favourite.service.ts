import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { FavouritesEntity } from '../entities/favourites.entity';
import { FavouritesDto } from '../dto/create-favourite.dto';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(FavouritesEntity)
        private readonly favouritesRepository: Repository<FavouritesEntity>
    ) {}
    // first add favourite
        // IN this service i need a function to add a post in favourite
    // the name is addFavourite and the parameter is FavouritesDto

    async addFavourites(favourite: FavouritesDto):Promise<FavouritesEntity> {
        return;
    }

    // second delete a Favourite post
    // the name is deleteFavourite and the parameter is FavouritesDto

    async deleteFavourite(favourite: FavouritesDto):Promise<FavouritesEntity>{
        return;
    }

    // third get a favourites Post
    // the name is getFavourites and the parameter is FavouritesDto

    async getFavourites () {
    }

}