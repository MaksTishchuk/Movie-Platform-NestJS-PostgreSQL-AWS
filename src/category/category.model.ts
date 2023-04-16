import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {MovieModel} from "../movie/movie.model";

@Table({tableName: 'Category', deletedAt: false, version: false})
export class CategoryModel extends Model<CategoryModel> {
  @Column({unique: true})
  name: string

  @Column({defaultValue: ''})
  description: string

  @HasMany(() => MovieModel)
  movies: MovieModel[]
}