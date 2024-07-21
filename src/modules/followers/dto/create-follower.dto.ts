import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFollowerDto {

  @ApiProperty({
    description: 'ID of the user who is following another user.',
    example: 'user-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  followerId: string;

  @ApiProperty({
    description: 'ID of the user who is being followed.',
    example: 'user-456',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  followingId: string;

  @ApiProperty({
    description: 'Date when the user started following.',
    example: '2024-07-21T15:30:00Z',
    required: false
  })
  @IsDate()
  @IsOptional()
  followDate?: Date;
}

export class DeleteFollowerDto {

  @ApiProperty({
    description: 'ID of the user who is unfollowing another user.',
    example: 'user-123',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  followerId: string;

  @ApiProperty({
    description: 'ID of the user who is being unfollowed.',
    example: 'user-456',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  followingId: string;
}
