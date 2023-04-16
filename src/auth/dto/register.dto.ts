import {IsEmail, IsString, Length, MinLength} from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6, {message: 'Minimal password length - 6 symbols!'})
  password: string
}