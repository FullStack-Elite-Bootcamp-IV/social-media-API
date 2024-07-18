// user module 
import { UserService } from '../users/services/user.service';
import { UsersController } from '../users/controllers/users.controller';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'; 
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({}),
        ConfigModule
    ],
    controllers: [UsersController],
    providers: [UserService, JwtService],
    exports: [UserService]
})
export class UserModule {}