import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ReviewDto} from "./dto/review.dto";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {ModeratorRoleGuard} from "../user/guards/moderator-role.guard";

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(
    @CurrentUser('id') userId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createReview(userId, dto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getAllReviews(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string
  ) {
    return this.reviewService.getAllReviews(page, perPage, search)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getReviewById(id)
  }

  @Put(':reviewId')
  @UseGuards(JwtAuthGuard)
  updateReview(
    @CurrentUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.updateReview(userId, reviewId, dto)
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  deleteReview(
    @CurrentUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number
  ) {
    return this.reviewService.deleteReview(userId, reviewId)
  }
}
