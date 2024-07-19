import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './services/favourites.service';
import { FavouritesController } from './controllers/favourites.controller';
import { FavouriteEntity } from './entities/favourite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteEntity])],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
