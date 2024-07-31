import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/services/user.service';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../dto/auth.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable() // Mark the class as a provider that can be injected
export class AuthService {
  constructor(
    private readonly userService: UserService, // Inject the UserService
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Inject the UserRepository
  ) {}

  // Method to create a new user
  async createUser(registerDTO: RegisterDTO): Promise<UserEntity | Error> {
    try {
      const username = await this.userRepository.findOne({where: { userName: registerDTO.userName } })
      const email = await this.userRepository.findOne({where: { email: registerDTO.email } })

      if (username || email) {
        throw new UnauthorizedException('Email or UserName already exist')
      }
      
      registerDTO.password = await bcryptjs.hash(registerDTO.password, 10); // Hash the user's password
      const user = this.userRepository.create(registerDTO); // Create a new user entity
      return await this.userRepository.save(user); // Save the user to the database
    } catch (error) {
      throw new Error(error)
    }
  }

  // Method to validate a user's credentials
  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const userByEmail = await this.userService.getByEmail(email); // Get the user by email

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password); // Compare the provided password with the stored password
        if (match) return userByEmail; // Return the user if the passwords match
      }
      return null; // Return null if the user is not found or passwords don't match
    } catch (error) {
      console.error('Error validating user:', error); // Log the error
      throw new UnauthorizedException('Invalid credentials'); // Throw an exception if validation fails
    }
  }

  // Method to sign a JWT token
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires }); // Sign and return the JWT token
  }

  // Method to generate a JWT token for a user
  public async generateJWT(
    user: UserEntity,
  ): Promise<{ accessToken: string; user: UserEntity }> {
    try {
      const getUser = await this.userService.getUserById(user.userId); // Get the user by ID
      if (!getUser) {
        throw new UnauthorizedException('User not found'); // Throw an exception if the user is not found
      }

      const payload: jwt.JwtPayload = { id: getUser.userId }; // Create the payload for the JWT token

      return {
        accessToken: this.signJWT({
          payload,
          secret: process.env.AUTH_SECRET,
          expires: '4h', // Set the token to expire in 1 hour
        }),
        user: getUser,
      };
    } catch (error) {
      console.error('Error generating JWT:', error); // Log the error
      throw new UnauthorizedException('Failed to generate JWT'); // Throw an exception if token generation fails
    }
  }

  // Method to log out a user
  public async logout(date: string, email: string): Promise<UserEntity | null> {
    try {
      if (!date) {
        throw new UnauthorizedException('Invalid date'); // Throw an exception if the date is invalid
      }
      const user = await this.userService.getByEmail(email); // Get the user by email

      if (!user) {
        throw new UnauthorizedException('User not found'); // Throw an exception if the user is not found
      }

      return await this.userService.updateLastLogout(email, date); // Update the user's last logout date
    } catch (error) {
      throw new UnauthorizedException('Failed to logout'); // Throw an exception if logout fails
    }
  }

  // Method to get the current user
  public async getUser(id: string): Promise<any> {
    try {
      const res = await this.userService.getUserById(id);
      // Return the current user without the password
      const { password, ...userWithoutPassword } = res;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Failed to get current user'); // Throw an exception if user retrieval fails
    }
  }
}
