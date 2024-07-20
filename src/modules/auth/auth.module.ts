import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controllers';
import { UsersModule } from '../users/user.module'; // Asegúrate de que la ruta sea correcta
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard'; // Importa el JwtAuthGuard

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de tener esta importación si usas @nestjs/config
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'), // Usa ConfigService para acceder a variables de entorno
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], // Añade el JwtAuthGuard a los proveedores
  exports: [AuthService, JwtAuthGuard, JwtModule], // Exporta el JwtAuthGuard si es necesario en otros módulos
})
export class AuthModule {}
