import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {MovieModel} from "../movie/movie.model";
import {UserModel} from "../user/user.model";

@Table({tableName: 'Rating', deletedAt: false, version: false})
export class RatingModel extends Model<RatingModel> {
  @Column({validate: {min: 1, max: 10}})
  rating: number

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