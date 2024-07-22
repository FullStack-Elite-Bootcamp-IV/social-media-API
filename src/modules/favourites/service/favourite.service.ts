import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FavouritesEntity } from '../entities/favourites.entity';
import { FavouritesDto } from '../dto/create-favourite.dto';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouritesEntity) // Injects the repository for the FavouritesEntity
    private readonly favouritesRepository: Repository<FavouritesEntity>
  ) {}

  // Method to add a new favourite
  public async addFavourite(favouritesDto: FavouritesDto): Promise<FavouritesEntity> {
    const { userId, postId } = favouritesDto;

    // Check if the favourite already exists
    const existingFavourite = await this.favouritesRepository.findOne({
      where: { userId, postId },
    });

    if (existingFavourite) {
      // Throws an error if the favourite already exists
      throw new HttpException('Item already added to favourites', HttpStatus.CONFLICT);
    }

    // Create and save the new favourite
    const favourite = this.favouritesRepository.create(favouritesDto);
    try {
      return await this.favouritesRepository.save(favourite);
    } catch (error) {
      // Throws a generic error if something goes wrong
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Method to delete a favourite by ID
  public async deleteFavourite(id: string): Promise<DeleteResult> {
    // Delete the favourite from the repository
    const result = await this.favouritesRepository.delete(id);

    if (result.affected === 0) {
      // Throws an error if no favourites were deleted
      throw new HttpException('Favourite not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  // Method to get all favourites for a specific user
  async getFavourites(userId: string): Promise<FavouritesEntity[]> {
    // Find favourites by userId
    const favourites = await this.favouritesRepository.find({ where: { userId } });

    if (!favourites.length) {
      // Throws an error if no favourites are found
      throw new HttpException('Favourites not found', HttpStatus.NOT_FOUND);
    }

    return favourites;
  }
}
