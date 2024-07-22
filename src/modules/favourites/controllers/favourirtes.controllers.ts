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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Favourites') // Tags for Swagger documentation
@Controller('favorites') // Base route for this controller
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}

  @ApiOperation({
    summary: 'Add a favourite', // Brief description of the operation
    description: 'Adds a new favourite and returns the added favourite.', // Detailed description
  })
  @ApiResponse({
    status: 201,
    description: 'Favourite successfully added. Returns the added favourite.', // Description for a successful response
    type: FavouritesDto, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access
  })
  @Post('/add') // Route for adding a favourite
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async addFavourite(@Body() body: FavouritesDto) {
    // Calls the service to add a favourite and returns the result
    return await this.FavouritesService.addFavourite(body);
  }

  @ApiOperation({
    summary: 'Delete a favourite by ID', // Brief description of the operation
    description: 'Deletes a specific favourite using its ID and returns a confirmation.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Favourite successfully deleted.', // Description for a successful response
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Favourite not found.', // Description for a not found response
  })
  @Delete('/delete/:id') // Route for deleting a favourite by ID
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async deleteFavourite(@Param('id') id: any) {
    // Calls the service to delete a favourite and returns the result
    return await this.FavouritesService.deleteFavourite(id);
  }

  @ApiOperation({
    summary: 'Get all favourites for a user', // Brief description of the operation
    description: 'Retrieves all favourites for a specific user using their ID and returns the list of favourites.', // Detailed description
  })
  @ApiResponse({
    status: 200,
    description: 'Favourites successfully retrieved. Returns a list of favourites.', // Description for a successful response
    type: [FavouritesDto], // Data type returned (a list of FavouritesDto)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.', // Description for a bad request response
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Favourites not found.', // Description for a not found response
  })
  @Get('/user/:userId') // Route for getting all favourites for a user
  @UseGuards(JwtAuthGuard) // Protects this route with JWT authentication guard
  public async getFavourites(@Param('userId') userId: string) {
    // Calls the service to get all favourites for a user and returns the result
    return await this.FavouritesService.getFavourites(userId);
  }
}
