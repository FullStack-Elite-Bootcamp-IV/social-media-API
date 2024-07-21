import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from '../service/favourite.service';
import { FavouritesDto } from '../dto/create-favourite.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Favourites') // Tags for Swagger documentation
@Controller('favorites') // Base route for this controller
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}

  @ApiResponse({
    status: 201,
    description: 'Favorite added.', // Description for successful creation response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access response
  })
  @Post('/add') // Route for adding a favourite
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async addFavourite(@Body() body: FavouritesDto) {
    // Calls the service to add a favourite and returns the result
    return await this.FavouritesService.addFavourite(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Favorite deleted.', // Description for successful deletion response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access response
  })
  @ApiResponse({
    status: 404,
    description: 'Favorite not found.', // Description for not found response
  })
  @Delete('/delete/:id') // Route for deleting a favourite by ID
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async deleteFavourite(@Param('id') id: any) {
    // Calls the service to delete a favourite and returns the result
    return await this.FavouritesService.deleteFavourite(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all favourites.', // Description for successful retrieval response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access response
  })
  @ApiResponse({
    status: 404,
    description: 'Favourites not found.', // Description for not found response
  })
  @Get('/user/:userId') // Route for getting all favourites for a user
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async getFavourites(@Param('userId') userId: string) {
    // Calls the service to get all favourites for a user and returns the result
    return await this.FavouritesService.getFavourites(userId);
  }
}
