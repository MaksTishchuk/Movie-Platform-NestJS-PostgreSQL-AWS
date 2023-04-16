import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {MovieModel} from "../movie/movie.model";
import {UserModel} from "../user/user.model";

@Table({tableName: 'Review', deletedAt: false, version: false})
export class ReviewModel extends Model<ReviewModel> {
  @Column({defaultValue: ''})
  review: string

  @ForeignKey(() => MovieModel)
  @Column({field: 'movie_id', onDelete: 'CASCADE'})
  movieId: number

  @BelongsTo(() => MovieModel)
  movie: MovieModel

  @ForeignKey(() => UserModel)
  @Column({field: 'user_id', onDelete: 'CASCADE'})
  userId: number

  @BelongsTo(() => UserModel)
  user: UserModel
}