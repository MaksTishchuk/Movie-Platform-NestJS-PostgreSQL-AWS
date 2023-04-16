import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RatingModel} from "./rating.model";
import {RatingDto} from "./dto/rating.dto";
import {MovieService} from "../movie/movie.service";
import {fn, col} from "sequelize"
import {MovieModel} from "../movie/movie.model";
import {UserModel} from "../user/user.model";
import {UserService} from "../user/user.service";

@Injectable()
export class RatingService {

  constructor(
    @InjectModel(RatingModel) private readonly ratingModel: typeof RatingModel,
    private readonly movieService: MovieService,
    private readonly userService: UserService
  ) {}

  async createOrUpdateRating(userId: number, dto: RatingDto) {
    let movie = await this.movieService.getMovieById(dto.movieId)
    try {
      let rating = await this.ratingModel.findOne({where: {userId: userId, movieId: movie.id}})
      if (rating) {
        await rating.update({rating: dto.rating})
      } else {
        rating = await this.ratingModel.create({
          rating: dto.rating, movieId: movie.id, userId: userId
        })
      }
      const avgRating = await this.getMovieAvgRating(movie.id)
      await movie.update({rating: avgRating})
      return {avgRating, rating}
    } catch (err) {throw new BadRequestException(`Something went wrong! ${err.message}`)}
  }

  async getMovieAvgRating(movieId) {
    await this.movieService.getMovieById(movieId)
    const avgRating = await this.ratingModel.findOne({
      where: {movieId},
      attributes: [[fn('avg', col('rating')), 'rating']]
    })
    return Number(Number(avgRating.rating).toFixed(2))
  }

  async getAllMovieRatings(movieId: number) {
    await this.movieService.getMovieById(movieId)
    return this.ratingModel.findAll({
      where: {movieId},
      include: [{model: UserModel}]
    })
  }

  async getAllUserRatings(userId: number) {
    await this.userService.getUserById(userId)
    return this.ratingModel.findAll({
      where: {userId},
      include: [{model: MovieModel}]
    })
  }

  async isUserSetMovieRating(userId, movieId) {
    const isSetRating = await this.ratingModel.findOne({where: {userId, movieId}})
    if (isSetRating) {
      return isSetRating
    }
    return {'isUserSetRating': false}
  }

  async deleteRating(userId: number, movieId: number) {
    return this.ratingModel.destroy({where: {userId, movieId}})
      .then(async (result) => {
        const movie = await this.movieService.getMovieById(movieId)
        if (!result) {throw new NotFoundException(`Rating was not found!`)}
        const avgRating = await this.getMovieAvgRating(movieId)
        await movie.update({rating: avgRating})
        return {avgRating}
      })
  }

}
