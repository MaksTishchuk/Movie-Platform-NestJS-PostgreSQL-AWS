import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RatingModel} from "./rating.model";
import {MovieModel} from "../movie/movie.model";
import {MovieModule} from "../movie/movie.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([RatingModel, MovieModel]), MovieModule, UserModule],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
