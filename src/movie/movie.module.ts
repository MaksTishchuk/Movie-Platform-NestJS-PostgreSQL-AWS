import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {MovieModel} from "./movie.model";
import {FilesService} from "../files/files.service";
import {ViewsService} from "../views/views.service";
import {ViewsModel} from "../views/views.model";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([MovieModel, ViewsModel]),
    UserModule
  ],
  controllers: [MovieController],
  providers: [MovieService, FilesService, ViewsService],
  exports: [MovieService]
})
export class MovieModule {}
