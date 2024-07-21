
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO, LogoutDTO, RegisterDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Usuario registrado exitosamente.',
  })
  
  async register(@Body() registerDto: RegisterDTO) {
    return this.authService.createUser(registerDto)
  };

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Datos no válidos.',
  })
  
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      email,
      password,
    );
    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }
    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  };

  @Post('logout')
  @ApiResponse({
    status: 200,
    description: 'Cierre de sesión exitoso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Fecha no válida.',
  })
  async logout(@Body() {date, email}: LogoutDTO) {
    
    const userLogout = await this.authService.logout(
      date,
      email,
    );

    if (!userLogout) {
      throw new UnauthorizedException('Invalid date');
    }
    return userLogout;

  }
}