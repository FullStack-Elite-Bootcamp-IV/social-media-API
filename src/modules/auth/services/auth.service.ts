/* // src/modules/auth/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  // Function to login a user and return a JWT token
  // login(authDto: AuthDto): Promise<{ accessToken: string }> { ... }

  // all this functions are used for the authentication and is vinculated with the login function
  // doesn't need to be exported or you can manage it directly in function, only is idea for this project

  // Function to register a new user and return a JWT token
  // register(authDto: AuthDto): Promise<{ accessToken: string }> { ... }

  // Function to create a JWT token
  // createJwtToken(payload: JwtPayload): string { ... }

  // Function to validate a JWT token
  // validateJwtToken(token: string): JwtPayload { ... }

  // Function to refresh a JWT token
  // refreshJwtToken(user: UserEntity): Promise<{ accessToken: string }> { ... }
}
 */