import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO, LogoutDTO, RegisterDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@ApiTags('Auth') // Tag for grouping related API endpoints in Swagger
@Controller() // Marks this class as a NestJS controller
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject the AuthService

  @Post('register') // Define the route for user registration
  @ApiOperation({ summary: 'Register a new user' }) // Brief description of the operation
  @ApiResponse({
    status: 201,
    description: 'User successfully registered. Returns the registered user.', // Description for a successful registration
    type: RegisterDTO, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for an error in registration
  })
  async register(@Body() registerDto: RegisterDTO) {
    return this.authService.createUser(registerDto); // Call the AuthService to create a new user
  }

  @Post('login') // Define the route for user login
  @ApiOperation({ summary: 'User login' }) // Brief description of the operation
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns a JWT token.', // Description for a successful login
    type: UserEntity, // Data type returned
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials. Check your email and password.', // Description for invalid login credentials
  })
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password); // Validate the user credentials
    if (!userValidate) {
      throw new UnauthorizedException('Invalid credentials'); // Throw an exception if validation fails
    }
    const jwt = await this.authService.generateJWT(userValidate); // Generate a JWT token

    return jwt; // Return the JWT token
  }

  @Post('logout') // Define the route for user logout
  @ApiOperation({ summary: 'User logout' }) // Brief description of the operation
  @ApiResponse({
    status: 200,
    description: 'Logout successful. Returns a boolean indicating success.', // Description for a successful logout
    type: Boolean, // Data type returned
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid logout date. Check the provided date.', // Description for an invalid logout date
  })
  async logout(@Body() { date, email }: LogoutDTO) {
    const userLogout = await this.authService.logout(date, email); // Perform the logout action

    if (!userLogout) {
      throw new UnauthorizedException('Invalid date'); // Throw an exception if logout fails
    }
    return userLogout; // Return the result of the logout action
  }

  // Quiero un endpoint para obtener el usuario actual (GET /me) desde el token
  @Get('me') // Define the route for getting the current user
  @UseGuards(JwtAuthGuard) // Protect the route with the JWT guard
  @ApiOperation({ summary: 'Get the current user' }) // Brief description of the operation
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: RegisterDTO, // Data type returned
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async me(@Req() req) {
    const userToken = req.get('Authorization').split(' ')[1]; // Get the JWT token from the request
    const user = await this.authService.getUser(req.user.id); // Get the user from the tokeno
    if (!user) {
      throw new UnauthorizedException('Unauthorized'); // Throw an exception if the user is not found
    }
    user.accessToken = userToken; // Add the token to the user object
    return user // Return the current user
  }
}
