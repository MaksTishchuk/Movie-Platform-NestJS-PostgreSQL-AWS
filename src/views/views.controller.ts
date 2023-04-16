import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { ViewsService } from './views.service';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get(':movieId')
  getMovieViewsByMonth(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.viewsService.getMovieViewsByMonth(movieId)
  }
}
