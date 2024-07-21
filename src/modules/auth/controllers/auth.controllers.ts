import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO, LogoutDTO, RegisterDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth") // Tag for grouping related API endpoints in Swagger
@Controller() // Marks this class as a NestJS controller
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject the AuthService

  @Post('register') // Define the route for user registration
  @ApiResponse({
    status: 200,
    description: 'Usuario registrado exitosamente.', // Description for successful registration
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for error in registration
  })
  async register(@Body() registerDto: RegisterDTO) {
    return this.authService.createUser(registerDto); // Call the AuthService to create a new user
  }

  @Post('login') // Define the route for user login
  @ApiResponse({
    status: 200,
    description: 'Successful login.', // Description for successful login
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid data.', // Description for invalid login credentials
  })
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      email,
      password,
    ); // Validate the user credentials
    if (!userValidate) {
      throw new UnauthorizedException('Data not valid'); // Throw an exception if validation fails
    }
    const jwt = await this.authService.generateJWT(userValidate); // Generate a JWT token

    return jwt; // Return the JWT token
  }

  @Post('logout') // Define the route for user logout
  @ApiResponse({
    status: 200,
    description: 'Successful logout.', // Description for successful logout
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid logout date.', // Description for invalid logout date
  })
  async logout(@Body() { date, email }: LogoutDTO) {
    const userLogout = await this.authService.logout(
      date,
      email,
    ); // Perform the logout action

    if (!userLogout) {
      throw new UnauthorizedException('Invalid date'); // Throw an exception if logout fails
    }
    return userLogout; // Return the result of the logout action
  }
}
