import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './service/favourite.service';
import { FavouritesController } from './controllers/favourirtes.controllers';
import { FavouritesEntity } from './entities/favourites.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavouritesEntity]),
  AuthModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
