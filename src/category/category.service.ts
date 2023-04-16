import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CategoryModel} from "./category.model";
import {CategoryDto} from "./dto/category.dto";
import {MovieModel} from "../movie/movie.model";
import {col, fn} from "sequelize";

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(CategoryModel) private readonly categoryModel: typeof CategoryModel
  ) {}

  async createCategory(dto: CategoryDto) {
    return this.categoryModel.create({...dto})
  }

  async getAllCategories() {
    return this.categoryModel.findAll({
      attributes: {
        include: [[fn("COUNT", col("movies")), "moviesCount"]]
      },
      include: [{
        model: MovieModel, attributes: []
      }],
      group: ["CategoryModel.id"],
      order: [['name', 'ASC']]
    })
  }

  async getCategoryById(id: number) {
    const category = await this.categoryModel.findOne({
      where: {id},
      include: [{model: MovieModel}]
    })
    if (!category) throw new NotFoundException(`Category with ID ${id} was not found!`)
    return category
  }

  async updateCategory(categoryId: number, dto: CategoryDto) {
    return this.getCategoryById(categoryId)
      .then(async (category) => {
        return category.update({...category, ...dto})
      })
  }

  async deleteCategory(categoryId: number) {
    const category = await this.getCategoryById(categoryId)
    return this.categoryModel.destroy({where: {id: categoryId}})
      .then((result) => {
        if (!result) {throw new NotFoundException(`Category with id "${categoryId}" was not deleted!`)}
        return {success: true, message: 'Category has been deleted!'}
      })
  }
}
