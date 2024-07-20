import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])
    , AuthModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule { }