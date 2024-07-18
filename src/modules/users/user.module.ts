// user module 

import { Module } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { UsersController } from '../users/controllers/users.controller';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from '../users/dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';   

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({}),
        ConfigModule
    ],
    controllers: [UsersController],
    providers: [UserService, JwtService],
    exports: [UserService]
})
export class UserModule {}