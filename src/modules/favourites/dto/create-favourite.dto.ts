
import { PartialType } from '@nestjs/mapped-types';
import { FavouritesEntity } from '../entities/favourites.entity';

export class FavouritesDto extends PartialType(FavouritesEntity) {

}