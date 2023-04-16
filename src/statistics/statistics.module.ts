import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ViewsModel} from "../views/views.model";
import {MovieModel} from "../movie/movie.model";
import {ReviewModel} from "../review/review.model";
import {RatingModel} from "../rating/rating.model";
import {UserModel} from "../user/user.model";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, MovieModel, ReviewModel, ViewsModel, RatingModel]),
    UserModule
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
