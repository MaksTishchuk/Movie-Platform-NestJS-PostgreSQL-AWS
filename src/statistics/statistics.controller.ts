import {Controller, Get, UseGuards} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ModeratorRoleGuard} from "../user/guards/moderator-role.guard";

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getCountStatistic() {
    return this.statisticsService.getCountStatistic()
  }

  @Get('aggregate')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getAggregateStatistic() {
    return this.statisticsService.getAggregateStatistic()
  }

  @Get('views-by-month')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  totalViewsByMonthStatistic() {
    return this.statisticsService.totalViewsByMonthStatistic()
  }
}
