import {IsIn, IsOptional, IsString} from "class-validator";
import {sortDirectionEnum, OrderMovieEnum} from "./order-movie.enum";

export class getMoviesFilterDto {
  @IsOptional()
  @IsString()
  page: number

  @IsOptional()
  @IsString()
  perPage: number

  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @IsIn([OrderMovieEnum.RATING, OrderMovieEnum.VIEWS, OrderMovieEnum.FEES, OrderMovieEnum.YEAR])
  sort: OrderMovieEnum

  @IsOptional()
  @IsIn([sortDirectionEnum.ASC, sortDirectionEnum.DESK])
  sortDirection: sortDirectionEnum
}