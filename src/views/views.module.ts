import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ViewsModel} from "./views.model";

@Module({
  imports: [SequelizeModule.forFeature([ViewsModel])],
  controllers: [ViewsController],
  providers: [ViewsService]
})
export class ViewsModule {}
