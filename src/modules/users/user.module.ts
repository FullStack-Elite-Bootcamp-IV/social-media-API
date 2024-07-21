import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Import the TypeOrmModule with UserEntity for database access
    TypeOrmModule.forFeature([UserEntity]),

    // Import JwtModule for handling JSON Web Tokens
    JwtModule,
  ],
  controllers: [
    // Register the UsersController to handle incoming HTTP requests
    UsersController,
  ],
  providers: [
    // Provide the UserService to handle business logic
    UserService,
  ],
  exports: [
    // Export UserService for use in other modules
    UserService,

    // Export TypeOrmModule to allow other modules to use TypeOrm features
    TypeOrmModule,
  ],
})
export class UsersModule {}
