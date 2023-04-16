import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from 'bcryptjs'
import {InjectModel} from "@nestjs/sequelize";
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {UserModel} from "../user/user.model";


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly jwtService: JwtService
  ) {}

  async getUserById(id: number) {
    const user = await this.userModel.findOne({where: {id}})
    if (!user) throw new NotFoundException('User was not found!')
    return user
  }

  async register(dto: RegisterDto) {
    const existUser = await this.userModel.findOne({where: {email: dto.email}})
    if (existUser) throw new BadRequestException('User already exist!')
    const newUser = await this.userModel.create({
      username: dto.username,
      email: dto.email,
      password: await bcryptjs.hash(dto.password, 10)
    })
    return {
      user: this.returnUserFields(newUser),
      accessToken: await this.getAccessToken(newUser.id, newUser.username, newUser.email)
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    return {
      user: this.returnUserFields(user),
      accessToken: await this.getAccessToken(user.id, user.username, user.email)
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userModel.findOne({
      where: {email: dto.email},
      attributes: ['id', 'username', 'email', 'password', 'avatarPath', 'createdAt']
    })
    if (!user) throw new NotFoundException('User was not found!')
    const isValidPassword = await bcryptjs.compare(dto.password, user.password)
    if (!isValidPassword) throw new NotFoundException('Invalid credentials!')
    return user
  }

  async getAccessToken(userId: number, username: string, email: string) {
    const data = {id: userId, username, email}
    return await this.jwtService.signAsync(data, {expiresIn: '7d', secret: process.env.JWT_SECRET})
  }

  returnUserFields(user: UserModel) {
    return {
      id: user.id, email: user.email, username: user.username, avatarPath: user.avatarPath, createdAt: user.createdAt
    }
  }
}
