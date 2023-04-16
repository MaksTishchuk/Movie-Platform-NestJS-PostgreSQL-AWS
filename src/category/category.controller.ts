import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ModeratorRoleGuard} from "../user/guards/moderator-role.guard";
import {CategoryDto} from "./dto/category.dto";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto)
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get(':categoryId')
  getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId)
  }

  @Put(':categoryId')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, dto)
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard, ModeratorRoleGuard)
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategory(categoryId)
  }
}
