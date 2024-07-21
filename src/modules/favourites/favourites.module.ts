import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './service/favourite.service';
import { FavouritesController } from './controllers/favourirtes.controllers';
import { FavouritesEntity } from './entities/favourites.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Imports the TypeOrmModule configured with the FavouritesEntity
    TypeOrmModule.forFeature([FavouritesEntity]),
    // Imports the AuthModule to handle authentication
    AuthModule
  ],
  controllers: [
    // Registers the FavouritesController to handle HTTP requests
    FavouritesController
  ],
  providers: [
    // Registers the FavouritesService to provide business logic
    FavouritesService
  ],
  exports: [
    // Exports the FavouritesService so it can be used by other modules
    FavouritesService
  ],
})
export class FavouritesModule {}
