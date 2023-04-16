import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: RegisterDto
  ) {
    return this.authService.register(dto)
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto
  ) {
    return this.authService.login(dto)
  }
}
