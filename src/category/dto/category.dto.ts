import {IsOptional, IsString} from "class-validator";

export class CategoryDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string
}