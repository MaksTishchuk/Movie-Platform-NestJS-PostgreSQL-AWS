import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { RatingService } from './rating.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {RatingDto} from "./dto/rating.dto";
import {ModeratorRoleGuard} from "../user/guards/moderator-role.guard";

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrUpdateRating(
    @CurrentUser('id') userId: number,
    @Body() dto: RatingDto,
  ) {
    return this.ratingService.createOrUpdateRating(userId, dto)
  }

  @Get(':movieId')
  getMovieAvgRating(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.ratingService.getMovieAvgRating(movieId)
  }

  @Get('movies/:movieId')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getAllReviews(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.ratingService.getAllMovieRatings(movieId)
  }

  @Get('users/:userId')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getAllUserRatings(@Param('userId', ParseIntPipe) userId: number) {
    return this.ratingService.getAllUserRatings(userId)
  }

  @Get('user-set-rating/:movieId')
  @UseGuards(JwtAuthGuard)
  isUserSetMovieRating(
    @CurrentUser('id') userId: number,
    @Param('movieId', ParseIntPipe) movieId: number
  ) {
    return this.ratingService.isUserSetMovieRating(userId, movieId)
  }

  @Delete(':movieId')
  @UseGuards(JwtAuthGuard)
  deleteRating(
    @CurrentUser('id') userId: number,
    @Param('movieId', ParseIntPipe) movieId: number
  ) {
    return this.ratingService.deleteRating(userId, movieId)
  }
}
