import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {UserService} from './user.service';
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ModeratorRoleGuard} from "./guards/moderator-role.guard";
import {ChangeRoleDto} from "./dto/change-role.dto";
import {AdminRoleGuard} from "./guards/admin-role.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  getAllUsers(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('search') search?: string
  ) {
    return this.userService.getAllUsers(page, perPage, search)
  }

  @Patch('change-user-role/:userId')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  changeUserRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: ChangeRoleDto
  ) {
    return this.userService.changeUserRole(userId, dto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@CurrentUser('id') userId: number) {
    return this.userService.getUserById(userId)
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateUserProfile(
    @CurrentUser('id') userId: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar?
  ) {
    return this.userService.updateProfile(userId, dto, avatar)
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  deleteUserProfile(@CurrentUser('id') userId: number) {
    return this.userService.deleteUser(userId)
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar?
  ) {
    return this.userService.updateProfile(id, dto, avatar)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  deleteUser(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.deleteUser(id)
  }
}
