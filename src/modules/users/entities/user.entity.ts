import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Like,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { FavouritesEntity } from 'src/modules/favourites/entities/favourites.entity';
import { ChatEntity } from 'src/modules/chats/entities/chat.entity';
import { MessageEntity } from 'src/modules/messages/entities/message.entity';
import { NotificationEntity } from 'src/modules/notifications/entities/notification.entity';
import { FollowersEntity } from 'src/modules/followers/entities/followers.entity';
import { LikeEntity } from 'src/modules/likes/entities/like.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;
  
  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true
  })
  gender?: Gender;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImage?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  college?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  workPlace?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personalWebSite?: string;

  @Column({ type: 'boolean', default: false })
  darkMode: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateDate?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastLogoutDate?: string;

  @OneToMany(() => PostEntity, post => post.user, { cascade: true, onDelete: 'CASCADE' })
  posts: PostEntity[];

  @OneToMany(() => FavouritesEntity, favourites => favourites.userId, { cascade: true, onDelete: 'CASCADE' })
  favourites: FavouritesEntity[];

  @OneToMany(() => ChatEntity, chat => chat.user1, { cascade: true, onDelete: 'CASCADE' })
  chat1: ChatEntity[];

  @OneToMany(() => ChatEntity, chat => chat.user2, { cascade: true, onDelete: 'CASCADE' })
  chat2: ChatEntity[];

  @OneToMany(() => MessageEntity, message => message.user, { cascade: true, onDelete: 'CASCADE' })
  messages: MessageEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.receptorUser, { cascade: true, onDelete: 'CASCADE' })
  notifications: NotificationEntity[];

  @OneToMany(() => FollowersEntity, follower => follower.follower, { cascade: true, onDelete: 'CASCADE' })
  followers: FollowersEntity[];

  @OneToMany(() => LikeEntity, like => like.user, { cascade: true, onDelete: 'CASCADE' })
  likes: LikeEntity[];
}
