import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MovieModel} from "./movie.model";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {WhereOptions, Op} from "sequelize";
import {FilesService} from "../files/files.service";
import {ViewsService} from "../views/views.service";
import {ReviewModel} from "../review/review.model";
import {RatingModel} from "../rating/rating.model";
import {UserModel} from "../user/user.model";
import {getMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {CategoryModel} from "../category/category.model";

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: typeof MovieModel,
    private viewsService: ViewsService,
    private fileService: FilesService
  ) {}

  async createMovie(dto: CreateMovieDto, poster) {
    if (!poster) {throw new BadRequestException('Movie must contains poster!')}
    const posterPath = await this.fileService.saveFile(poster, 'posters')
    return this.movieModel.create({...dto, poster: posterPath})
  }

  async getMovies(dto: getMoviesFilterDto, categoryId?: number) {
    const perPage = dto.perPage || 10
    const page = dto.page || 1
    const skip = perPage * (page - 1)

    let options: WhereOptions<MovieModel> = {}
    if (dto.search) {
      options = {
        name: { [Op.iLike]: `%${dto.search}%` }
      }
    }
    if (categoryId) {
      options.categoryId = categoryId
    }

    const sort = dto.sort || 'createdAt'
    const sortDirection = dto.sortDirection || 'DESC'

    return this.movieModel.findAll({
      where: {...options},
      order: [[sort, sortDirection], ['name', 'ASC']],
      include: [
        {
          model: CategoryModel
        }
      ],
      limit: perPage,
      offset: skip
    })
  }

  async getOneMovie(id: number) {
    const movie = await this.getMovieById(id)
    await movie.update({views: ++movie.views})
    const viewsByMonth = await this.viewsService.updateViewsByMonth(movie.id)
    return {movie, viewsByMonth}
  }

  async getMovieById(id: number) {
    const movie = await this.movieModel.findOne({
      where: {id},
      include: [
        {
          model: CategoryModel
        },
        {
          model: ReviewModel,
          include: [UserModel]
        },
        {
          model: RatingModel,
          include: [UserModel]
        }
      ]
    })
    if (!movie) throw new NotFoundException(`Movie with ID ${id} was not found!`)
    return movie
  }

  async updateMovie(id: number, dto: UpdateMovieDto, poster) {
    const findMovie = await this.getMovieById(id)
    try {
      if (poster) {
        this.fileService.removeFile(findMovie.poster)
        poster = await this.fileService.saveFile(poster, 'posters')
      }
      return findMovie.update({
        ...findMovie,
        ...dto,
        poster: poster ? poster : findMovie.poster
      })
    } catch (err) {throw new BadRequestException(`Something went wrong! ${err.message}`)}
  }

  async deleteMovie(id: number) {
    const movie = await this.getMovieById(id)
    const result = await this.movieModel.destroy({where: {id}})
    if (!result) {throw new NotFoundException(`Movie with id "${id}" was not deleted!`)}
    await this.fileService.removeFile(movie.poster)
    return {success: true, message: 'Movie has been deleted!'}
  }

}
