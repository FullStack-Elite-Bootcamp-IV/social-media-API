// src/modules/notifications/entities/notification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';// if need more entity you can add here
import { UserEntity } from '../../users/entities/user.entity';

@Entity('notifications')
export class NotificationEntity {
    // here define the notification entity
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20})
    type : string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    notificationDate: Date;

    @Column({type: 'varchar', length:100, unique: true})
    emisorUser: string;

    @ManyToOne(()=>UserEntity, (user) => user.id)
    receptorUser:UserEntity;

}
