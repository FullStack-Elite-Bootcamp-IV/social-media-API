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

    // Here is the services of user 

    // first add favourite
        // IN this service i need a function to add a post in favourite
    // the name is addFavourite and the parameter is FavouritesDto

    async addFavourites(favourite: FavouritesDto) {
    }

    // second delete a Favourite post
    // the name is deleteFavourite and the parameter is FavouritesDto

    async deleteFavourite(favourite: FavouritesDto) {
    }

    // third get a favourites Post
    // the name is getFavourites and the parameter is FavouritesDto

    async getFavourites (favourite: FavouritesDto) {
    }

}