import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ViewsModel} from "./views.model";
import {fn, Op} from "sequelize";
import * as dayjs from "dayjs";

@Injectable()
export class ViewsService {
  constructor(
    @InjectModel(ViewsModel) private readonly viewsModel: typeof ViewsModel,
  ) {}

  async updateViewsByMonth(movieId: number) {
    const month = dayjs().month() + 1
    const year = dayjs().year()
    const row = await this.viewsModel.findOne({
      where: {
        movieId,
        month: month,
        year: year,
        [Op.and]: [
          fn('EXTRACT(MONTH from "createdAt") =', month),
          fn('EXTRACT(YEAR from "createdAt") =', year)
        ]
      }
    })
    if (!row) {
      await this.viewsModel.create({movieId, views: 1, month, year})
    } else {
      await row.update({views: ++row.views})
    }
    return this.viewsModel.findAll({
      where: {movieId},
      order: [['year', 'DESC'], ['month', 'DESC']],
      limit: 12
    })
  }

  async getMovieViewsByMonth(movieId: number) {
    return this.viewsModel.findAll({
      where: {movieId},
      order: [['year', 'DESC'], ['month', 'DESC']],
      include: [{all: true}],
      limit: 12
    })
  }

}
