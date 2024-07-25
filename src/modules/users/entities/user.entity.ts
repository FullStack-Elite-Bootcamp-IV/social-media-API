import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { FavouritesEntity } from '../../favourites/entities/favourites.entity';
import { ChatEntity } from '../../chats/entities/chat.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { FollowersEntity } from '../../followers/entities/followers.entity';
import { LikeEntity } from '../../likes/entities/like.entity';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty desde NestJS Swagger

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  NULL = null
}

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the user.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  userId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({
    description: 'Username of the user.',
    example: 'john_doe',
    required: true
  })
  userName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({
    description: 'Email address of the user.',
    example: 'john.doe@example.com',
    required: true
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'Password of the user.',
    example: 'password123',
    required: true
  })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
    required: false
  })
  fullName: string;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Age of the user.',
    example: 30,
    required: false
  })
  age?: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
    default: null
  })
  @ApiProperty({
    description: 'Gender of the user.',
    enum: Gender,
    enumName: 'Gender',
    required: false
  })
  gender?: Gender;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'URL to the profile image of the user.',
    example: 'https://example.com/profile.jpg',
    required: false
  })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'URL to the cover image of the user.',
    example: 'https://example.com/cover.jpg',
    required: false
  })
  coverImage?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ApiProperty({
    description: 'Description or bio of the user.',
    example: 'A passionate developer.',
    required: false
  })
  description?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Name of the college the user attended.',
    example: 'University of Example',
    required: false
  })
  college?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Name of the workplace where the user works.',
    example: 'Example Corp',
    required: false
  })
  workPlace?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Location of the user.',
    example: 'New York, USA',
    required: false
  })
  location?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'URL to the personal website of the user.',
    example: 'https://johndoe.com',
    required: false
  })
  personalWebSite?: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    description: 'Whether the user prefers dark mode.',
    example: false,
    required: false
  })
  darkMode: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date and time when the user account was created.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  creationDate?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date and time when the user account was last updated.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  updateDate?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Date and time when the user last logged out.',
    example: '2024-07-21T15:30:00Z',
    required: false
  })
  lastLogoutDate?: string;

  // One-to-many relationship with posts
  @OneToMany(() => PostEntity, (post) => post.userId)
  @ApiProperty({
    description: 'Posts created by the user.',
    type: () => PostEntity,
    isArray: true,
    required: false
  })
  posts: PostEntity[];

  // One-to-many relationship with favourites
  @OneToMany(() => FavouritesEntity, (favourites) => favourites.user)
  @ApiProperty({
    description: 'Favourite items saved by the user.',
    type: () => FavouritesEntity,
    isArray: true,
    required: false
  })
  favourites: FavouritesEntity[];

  // One-to-many relationship with chats (as user1)
  @OneToMany(() => ChatEntity, (chat) => chat.user1)
  @ApiProperty({
    description: 'Chats initiated by the user (as user1).',
    type: () => ChatEntity,
    isArray: true,
    required: false
  })
  chat1: ChatEntity[];

  // One-to-many relationship with chats (as user2)
  @OneToMany(() => ChatEntity, (chat) => chat.user2)
  @ApiProperty({
    description: 'Chats initiated by other users with this user (as user2).',
    type: () => ChatEntity,
    isArray: true,
    required: false
  })
  chat2: ChatEntity[];

  // One-to-many relationship with messages
  @OneToMany(() => MessageEntity, (message) => message.user)
  @ApiProperty({
    description: 'Messages sent by the user.',
    type: () => MessageEntity,
    isArray: true,
    required: false
  })
  messages: MessageEntity[];

  // One-to-many relationship with notifications (receptor)
  @OneToMany(() => NotificationEntity, (notification) => notification.receptor)
  @ApiProperty({
    description: 'Notifications received by the user.',
    type: () => NotificationEntity,
    isArray: true,
    required: false
  })
  notificationReceptor: NotificationEntity[];

  // One-to-many relationship with notifications (emisor)
  @OneToMany(() => NotificationEntity, (notification) => notification.emisor)
  @ApiProperty({
    description: 'Notifications sent by the user.',
    type: () => NotificationEntity,
    isArray: true,
    required: false
  })
  notificationEmisor: NotificationEntity[];

  // One-to-many relationship with followers (as follower)
  @OneToMany(() => FollowersEntity, (follower) => follower.follower)
  @ApiProperty({
    description: 'Users followed by this user.',
    type: () => FollowersEntity,
    isArray: true,
    required: false
  })
  follower: FollowersEntity[];

  // One-to-many relationship with followers (as following)
  @OneToMany(() => FollowersEntity, (follower) => follower.following)
  @ApiProperty({
    description: 'Users following this user.',
    type: () => FollowersEntity,
    isArray: true,
    required: false
  })
  following: FollowersEntity[];
}
