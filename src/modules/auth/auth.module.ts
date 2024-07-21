import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controllers';
import { UsersModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard'; 

@Module({
  imports: [
    ConfigModule.forRoot(), // Load the configuration module
    ConfigModule, // Ensure ConfigModule is available
    forwardRef(() => UsersModule), // Use forwardRef to handle circular dependency
    PassportModule, // Import PassportModule for authentication
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'), // Use the secret from config
        signOptions: { expiresIn: '240m' }, // Set token expiration to 60 minutes
      }),
    }),
  ],
  controllers: [AuthController], // Declare the controllers
  providers: [AuthService, JwtAuthGuard], // Provide the AuthService and JwtAuthGuard
  exports: [AuthService, JwtAuthGuard, JwtModule], // Export the services and modules
})
export class AuthModule {}
