import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FavouritesEntity } from '../entities/favourites.entity';
import { FavouritesDto } from '../dto/create-favourite.dto';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouritesEntity)
    private readonly favouritesRepository: Repository<FavouritesEntity>
  ) { }

  public async addFavourite(FavouritesDto: FavouritesDto): Promise<FavouritesEntity> {
    try {
      const favourite = this.favouritesRepository.create(FavouritesDto)
      return this.favouritesRepository.save(favourite)
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteFavourite(id: FavouritesDto): Promise<DeleteResult | undefined> {
    try {
      const result = await this.favouritesRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Favourite not found');
      }
      return result
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFavourites(userId: FavouritesDto['userId']): Promise<FavouritesEntity[]> {
    try {
      const favourites = this.favouritesRepository.find({ where: { userId: userId } })
      if (!favourites) {
        throw new Error('Favourites not found');
      }
      return favourites;
    } catch (error) {
      throw new Error(error);
    }
  }
}