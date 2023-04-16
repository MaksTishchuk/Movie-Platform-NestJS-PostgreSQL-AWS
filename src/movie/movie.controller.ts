import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ModeratorRoleGuard} from "../user/guards/moderator-role.guard";
import {getMoviesFilterDto} from "./dto/get-movies-filter.dto";

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  @UseInterceptors(FileInterceptor('poster'))
  createMovie(
    @Body() dto: CreateMovieDto,
    @UploadedFile() poster?
  ) {
    return this.movieService.createMovie(dto, poster)
  }

  @Get()
  getAllMovies(
    @Query() dto: getMoviesFilterDto
  ) {
    return this.movieService.getMovies(dto)
  }

  @Get('by-category/:categoryId')
  getMoviesByCategory(
    @Query() dto: getMoviesFilterDto,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.movieService.getMovies(dto, categoryId)
  }

  @Get(':id')
  getMovieById(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.getOneMovie(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  @UseInterceptors(FileInterceptor('poster'))
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
    @UploadedFile() poster?
  ) {
    return this.movieService.updateMovie(id, dto, poster)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  deleteVideo(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.movieService.deleteMovie(id)
  }

}
