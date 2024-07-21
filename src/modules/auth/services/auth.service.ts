import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/services/user.service';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../dto/auth.dto';
import * as bycryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async createUser(registerDTO: RegisterDTO): Promise<UserEntity | Error> {
    try {      
      registerDTO.password = await bycryptjs.hash(registerDTO.password, 10);
      const user = this.userRepository.create(registerDTO);
      return await this.userRepository.save(user);
    } catch (error) {
      return error;
    }
  }

  public async validateUser(email: string, password: string): Promise<UserEntity | null> {
    try {
      const userByEmail = await this.userService.getByEmail(email);

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password);
        if (match) return userByEmail;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
    try {
      const getUser = await this.userService.getUserById(user.userId);
      if (!getUser) {
        throw new UnauthorizedException('User not found');
      }

      const payload: jwt.JwtPayload = { id: getUser.userId };

      return {
        accessToken: this.signJWT({
          payload,
          secret: process.env.AUTH_SECRET,
          expires: '1h',
        }),
        user: getUser,
      };
    } catch (error) {
      console.error('Error generating JWT:', error);
      throw new UnauthorizedException('Failed to generate JWT');
    }
  }

  public async logout(date: string, email: string): Promise<UserEntity | null> {
    try{
      if (!date) {
        throw new UnauthorizedException('Invalid date');
      }
      const user = await this.userService.getByEmail(email);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.userService.updateLastLogout(email, date);
    } catch (error) {
      throw new UnauthorizedException('Failed to logout');
    }
  }
}
