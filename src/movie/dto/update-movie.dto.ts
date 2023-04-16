import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsOptional()
  categoryId: number

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  year?: string

  @IsString()
  @IsOptional()
  country?: string

  @IsString()
  @IsOptional()
  releaseDate?: string

  @IsString()
  @IsOptional()
  director?: string

  @IsString()
  @IsOptional()
  producer?: string

  @IsString()
  @IsOptional()
  cast?: string

  @IsNumber()
  @IsOptional()
  duration?: number

  @IsNumber()
  @IsOptional()
  fees?: number
}