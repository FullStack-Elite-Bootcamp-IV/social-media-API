import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { FavouritesEntity } from '../../favourites/entities/favourites.entity';
import { ChatEntity } from '../../chats/entities/chat.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { FollowersEntity } from '../../followers/entities/followers.entity';
import { LikeEntity } from '../../likes/entities/like.entity';

// Enumeration for Gender
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  NULL = null
}

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable:true })
  fullName: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
    default: null
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

  // One-to-many relationship with posts
  @OneToMany(() => PostEntity, (post) => post.userId)
  posts: PostEntity[];

  // One-to-many relationship with favourites
  @OneToMany(() => FavouritesEntity, (favourites) => favourites.user)
  favourites: FavouritesEntity[];

  // One-to-many relationship with chats (as user1)
  @OneToMany(() => ChatEntity, (chat) => chat.user1)
  chat1: ChatEntity[];

  // One-to-many relationship with chats (as user2)
  @OneToMany(() => ChatEntity, (chat) => chat.user2)
  chat2: ChatEntity[];

  // One-to-many relationship with messages
  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  // One-to-many relationship with notifications (receptorUser)
  @OneToMany(() => NotificationEntity, (notification) => notification.receptorUser)
  notifications: NotificationEntity[];

  // One-to-many relationship with followers (as follower)
  @OneToMany(() => FollowersEntity, (follower) => follower.follower)
  follower: FollowersEntity[];

  // One-to-many relationship with followers (as following)
  @OneToMany(() => FollowersEntity, (follower) => follower.following)
  following: FollowersEntity[];

  /* @OneToMany(() => LikeEntity, like => like.user)
  likes: LikeEntity[]; */
}
