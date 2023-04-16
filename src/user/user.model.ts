import {AllowNull, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {ReviewModel} from "../review/review.model";
import {RatingModel} from "../rating/rating.model";
import * as sequelize from "sequelize";

export enum EnumUserRoles {
  ADMIN = 'admin', MODERATOR = 'moderator', USER = 'user'
}

@Table({
  tableName: 'User',
  deletedAt: false,
  version: false,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
})
export class UserModel extends Model<UserModel> {

  // public static ROLES = EnumUserRoles

  @Column({unique: true})
  username: string

  @Column({unique: true})
  email: string

  @Column
  password: string

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(EnumUserRoles.ADMIN, EnumUserRoles.MODERATOR, EnumUserRoles.USER),
    defaultValue: 'user',
    comment: 'User roles'
  })
  role: string

  @Column({defaultValue: '', field: 'first_name'})
  firstName: string

  @Column({defaultValue: '', field: 'last_name'})
  lastName: string

  @Column({defaultValue: ''})
  about: string

  @Column({defaultValue: '', field: 'avatar_path'})
  avatarPath: string

  @HasMany(() => ReviewModel)
  reviews: ReviewModel[]

  @HasMany(() => RatingModel)
  ratings: RatingModel[]
}