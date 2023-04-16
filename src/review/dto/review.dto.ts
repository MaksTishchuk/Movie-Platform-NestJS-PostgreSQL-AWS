import {IsNumber, IsString} from "class-validator";

export class ReviewDto {
  @IsString()
  review: string

  @IsNumber()
  movieId: number
}