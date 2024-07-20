// here you must to create a follower dto
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
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
  followDate?: Date;
}
  