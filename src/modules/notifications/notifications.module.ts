import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controllers';
import { NotificationEntity } from './entities/notification.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/user.module'; 
import { UserEntity } from '../users/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, UserEntity]), 
    AuthModule,
    UsersModule, 
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
