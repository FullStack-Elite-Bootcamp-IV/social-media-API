// here you must to create a follower dto
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
export class CreateFollowerDto {
  @IsString()
  @IsNotEmpty()
  followerId: string;

  @IsString()
  @IsNotEmpty()
  followingId: string;

  @IsDate()
  followDate?: Date;
}
  