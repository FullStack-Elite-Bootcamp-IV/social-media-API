// here you must to create a follower dto
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
export class CreateFollowerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  followerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  followingId: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  followDate?: Date;
}

export class DeleteFollowerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  followerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  followingId: string;
}
