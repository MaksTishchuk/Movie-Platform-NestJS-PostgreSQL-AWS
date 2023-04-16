import {IsNumber, Max, Min} from "class-validator";



export class RatingDto {
  @IsNumber()
  @Min(1, {message: 'Minimum rating value - 1!'})
  @Max(10, {message: 'Maximum rating value - 10!'})
  rating: number

  @IsNumber()
  movieId: number
}