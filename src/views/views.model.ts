import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {MovieModel} from "../movie/movie.model";

@Table({tableName: 'Views', deletedAt: false, version: false})
export class ViewsModel extends Model<ViewsModel> {
  @ForeignKey(() => MovieModel)
  @Column({field: 'movie_id', onDelete: 'CASCADE'})
  movieId: number

  @BelongsTo(() => MovieModel)
  movie: MovieModel

  @Column({defaultValue: 0})
  views: number

  @Column
  month: number

  @Column
  year: number
}