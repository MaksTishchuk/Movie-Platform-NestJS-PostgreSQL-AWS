import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ReviewModel} from "./review.model";
import {ReviewDto} from "./dto/review.dto";
import {MovieService} from "../movie/movie.service";
import {UserService} from "../user/user.service";
import {Op, WhereOptions} from "sequelize";

@Injectable()
export class ReviewService {

  constructor(
    @InjectModel(ReviewModel) private readonly reviewModel: typeof ReviewModel,
    private readonly movieService: MovieService,
    private readonly userService: UserService
  ) {}

  async createReview(userId: number, dto: ReviewDto) {
    await this.movieService.getMovieById(dto.movieId)
    return this.reviewModel.create({
      review: dto.review, movieId: dto.movieId, userId: userId
    })
  }

  async getAllReviews(page: number = 1, perPage: number = 10, search?: string) {
    let options: WhereOptions<ReviewModel> = {}
    if (search) {
      options = {
        review: { [Op.iLike]: `%${search}%` }
      }
    }
    const skip = perPage * (page - 1)
    return this.reviewModel.findAll({
      where: {...options},
      order: [['createdAt', 'DESC']],
      include: [{all: true}],
      limit: perPage,
      offset: skip
    })
  }

  async getReviewById(id: number) {
    const review = await this.reviewModel.findOne({
      where: {id},
      include: [{all: true}]
    })
    if (!review) throw new NotFoundException(`Review with ID ${id} was not found!`)
    return review
  }

  async updateReview(userId: number, reviewId: number, dto: ReviewDto) {
    await this.movieService.getMovieById(dto.movieId)
    return this.getReviewById(reviewId)
      .then(async (review) => {
        const user = await this.userService.getUserById(userId)
        if (review.userId !== user.id) {
          throw new BadRequestException('User has not access to update this review!')
        }
        return review.update({...review, ...dto})
      })
  }

  async deleteReview(userId: number, reviewId: number) {
    const user = await this.userService.getUserById(userId)
    const review = await this.getReviewById(reviewId)
    if (review.userId !== user.id && !(['admin', 'moderator'].includes(user.role))) {
      throw new BadRequestException('User has not access to delete this review!')
    }
    return this.reviewModel.destroy({where: {id: reviewId}})
      .then((result) => {
        if (!result) {throw new NotFoundException(`Review with id "${reviewId}" was not deleted!`)}
        return {success: true, message: 'Review has been deleted!'}
      })
  }

}
