/* import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/jwt.guard';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // login(@Body() authDto: AuthDto): Promise<{ accessToken: string }> { ... }

  // @UseGuards(AuthGuard)
  // @Post('refresh')
  // refresh(@Req() req): Promise<{ accessToken: string }> { ... }
}
 */