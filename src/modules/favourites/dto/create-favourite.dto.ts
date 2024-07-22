import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FavouritesDto {
  
  @ApiProperty({
    description: 'The ID of the user who is adding the favorite.', // Description for Swagger documentation
  })
  @IsString() // Ensures the value is a string
  @IsNotEmpty() // Ensures the value is not empty
  userId: string;

  @ApiProperty({
    description: 'The ID of the post that is being favorited.', // Description for Swagger documentation
  })
  @IsString() // Ensures the value is a string
  @IsNotEmpty() // Ensures the value is not empty
  postId: string;
}
