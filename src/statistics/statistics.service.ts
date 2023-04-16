import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {col, fn, literal} from "sequelize";
import {ViewsModel} from "../views/views.model";
import {MovieModel} from "../movie/movie.model";
import {ReviewModel} from "../review/review.model";
import {RatingModel} from "../rating/rating.model";
import {UserModel} from "../user/user.model";

@Injectable()
export class StatisticsService {

  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(MovieModel) private readonly movieModel: typeof MovieModel,
    @InjectModel(ReviewModel) private readonly reviewModel: typeof ReviewModel,
    @InjectModel(RatingModel) private readonly ratingModel: typeof RatingModel,
    @InjectModel(ViewsModel) private readonly viewsModel: typeof ViewsModel,
  ) {}

  async getCountStatistic() {
    const countAllUsers = await this.userModel.count()
    const countAllMovies = await this.movieModel.count()
    const countAllReviews = await this.reviewModel.count()
    const countQuantityRatings = await this.ratingModel.count()
    return {
      countAllUsers,
      countAllMovies,
      countAllReviews,
      countQuantityRatings
    }
  }

  async getAggregateStatistic() {
    const totalViews = await this.movieModel.findOne({
      attributes: [[fn('sum', col('views')), 'views']]
    })
    const avgViews = await this.movieModel.findOne({
      attributes: [[fn('avg', col('views')), 'views']]
    })
    const avgRating = await this.movieModel.findOne({
      attributes: [[fn('avg', col('rating')), 'rating']]
    })
    const minRating = await this.movieModel.findOne({
      attributes: [[fn('min', col('rating')), 'rating']]
    })
    const maxRating = await this.movieModel.findOne({
      attributes: [[fn('max', col('rating')), 'rating']]
    })
    const totalFees = await this.movieModel.findOne({
      attributes: [[fn('sum', col('fees')), 'fees']]
    })
    const avgFees = await this.movieModel.findOne({
      attributes: [[fn('avg', col('fees')), 'fees']]
    })
    return {
      totalViews: Number(totalViews.views),
      avgViews: Number(avgViews.views),
      avgRating: Number(avgRating.rating),
      minRating: Number(minRating.rating),
      maxRating: Number(maxRating.rating),
      totalFees: Number(totalFees.fees),
      avgFees: Number(avgFees.fees)
    }
  }

  async totalViewsByMonthStatistic() {
    return this.viewsModel.findAll({
      attributes: [
        ['month', 'month'],
        ['year', 'year'],
        [fn('sum', col('views')), 'views'],
        [literal("concat(month, '-', year)"), 'month-year']
      ],
      group: ['month-year', 'month', 'year'],
      order: [['year', 'DESC'], ['month', 'DESC']],
      limit: 12
    })
  }

}
