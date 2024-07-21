import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  public async addFavourite(favouritesDto: FavouritesDto): Promise<FavouritesEntity> {
    try {
      const { userId, postId } = favouritesDto;

      // Verifica si el favorito ya existe
      const existingFavourite = await this.favouritesRepository.findOne({
        where: { userId, postId },
      });

      if (existingFavourite) {
        throw new HttpException('Item already added to favourites', HttpStatus.CONFLICT);
      }

      // Crea y guarda el nuevo favorito
      const favourite = this.favouritesRepository.create(favouritesDto);
      return await this.favouritesRepository.save(favourite);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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