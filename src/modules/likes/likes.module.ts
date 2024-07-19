import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controller';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
