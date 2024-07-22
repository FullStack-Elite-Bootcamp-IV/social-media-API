import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controllers';
import { FollowersEntity } from './entities/followers.entity';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chats/chats.module'; // Importa ChatModule

@Module({
  imports: [
    TypeOrmModule.forFeature([FollowersEntity]), // Importa el módulo TypeOrm con FollowersEntity
    AuthModule, // Importa AuthModule para funcionalidades relacionadas con autenticación
    ChatModule, // Importa ChatModule para acceso a ChatService
  ],
  controllers: [
    FollowersController, // Registra el FollowersController
  ],
  providers: [
    FollowersService, // Registra el FollowersService
  ],
  exports: [
    FollowersService, // Exporta FollowersService para su uso en otros módulos
    TypeOrmModule, // Exporta TypeOrmModule para que otros módulos puedan utilizarlo
  ],
})
export class FollowersModule {}
