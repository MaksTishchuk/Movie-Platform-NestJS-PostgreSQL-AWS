import {IsEmail, IsString, MinLength} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6, {message: 'Minimal password length - 6 symbols!'})
  password: string
}