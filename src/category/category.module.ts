import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {MovieModule} from "../movie/movie.module";
import {CategoryModel} from "./category.model";
import {UserModule} from "../user/user.module";

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel]), MovieModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
