import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ReviewModel} from "./review.model";
import {MovieModule} from "../movie/movie.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([ReviewModel]), MovieModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
