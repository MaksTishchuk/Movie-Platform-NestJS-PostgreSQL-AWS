import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateMovieDto {
  @IsString()
  name: string

  @IsNumber()
  categoryId: number

  @IsString()
  description: string

  @IsString()
  year: string

  @IsString()
  country: string

  @IsString()
  releaseDate: string

  @IsString()
  director: string

  @IsString()
  producer: string

  @IsString()
  cast: string

  @IsNumber()
  duration: number

  @IsNumber()
  fees: number

  @IsOptional()
  poster?: any
}