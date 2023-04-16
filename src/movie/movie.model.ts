import {BelongsTo, Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {ReviewModel} from "../review/review.model";
import {RatingModel} from "../rating/rating.model";
import * as sequelize from "sequelize";
import {CategoryModel} from "../category/category.model";

@Table({tableName: 'Movie', deletedAt: false, version: false})
export class MovieModel extends Model<MovieModel> {
  @Column({unique: true})
  name: string

  @ForeignKey(() => CategoryModel)
  @Column({field: 'category_id', onDelete: 'SET NULL', allowNull: true})
  categoryId: number

  @BelongsTo(() => CategoryModel)
  category: CategoryModel

  @Column({defaultValue: ''})
  poster: string

  @Column({defaultValue: ''})
  description: string

  @Column({defaultValue: ''})
  year: string

  @Column({defaultValue: ''})
  country: string

  @Column({field: 'release_date', defaultValue: ''})
  releaseDate: string

  @Column({defaultValue: ''})
  director: string

  @Column({defaultValue: ''})
  producer: string

  @Column({defaultValue: ''})
  cast: string

  @Column({defaultValue: 0})
  duration: number

  @Column({defaultValue: 0})
  fees: number

  @Column({defaultValue: 0})
  views: number

  @Column({defaultValue: 0, type: sequelize.FLOAT})
  rating: number

  @HasMany(() => ReviewModel)
  reviews: ReviewModel[]

  @HasMany(() => RatingModel)
  ratings: RatingModel[]
}