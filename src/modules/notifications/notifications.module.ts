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
    // Import TypeOrmModule to provide repositories for NotificationEntity and UserEntity
    TypeOrmModule.forFeature([NotificationEntity, UserEntity]), 
    // Import AuthModule for authentication functionality
    AuthModule,
    // Import UsersModule to handle user-related operations
    UsersModule, 
  ],
  // Register the NotificationsController to handle HTTP requests related to notifications
  controllers: [NotificationsController],
  // Provide the NotificationsService to handle business logic for notifications
  providers: [NotificationsService],
  // Export NotificationsService so it can be used in other modules
  exports: [NotificationsService],
})
export class NotificationsModule {}
