import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {UserModel} from "./user.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ChangeRoleDto} from "./dto/change-role.dto";
import {Op, WhereOptions} from "sequelize";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private fileService: FilesService
  ) {}

  async getAllUsers(page: number = 1, perPage: number = 10, search) {
    let options: WhereOptions<UserModel> = {}
    if (search) {
      options = {
        [Op.or]: [
          {username: { [Op.iLike]: `%${search}%` }},
          {email: { [Op.iLike]: `%${search}%` }}
        ]
      }
    }
    const skip = perPage * (page - 1)
    return this.userModel.findAll(
      {where: {...options},
        order: [['createdAt', 'DESC']],
        limit: perPage,
        offset: skip
      })
  }

  async changeUserRole(id: number, dto: ChangeRoleDto) {
    const user = await this.getUserById(id)
    if (user.role === 'admin') {
      throw new BadRequestException(`User with ID ${id} is Admin. You cant change role!`)
    }
    return user.update({role: dto.role})
  }

  async getUserById(id: number) {
    const user = await this.userModel.findOne({
      where: {id},
      include: [{all: true}]
    })
    if (!user) throw new NotFoundException(`User with ID ${id} was not found!`)
    return user
  }

  async updateProfile(id: number, dto: UpdateUserDto, avatar) {
    const user = await this.getUserById(id)
    try {
      if (avatar) {
        this.fileService.removeFile(user.avatarPath)
        avatar = await this.fileService.saveFile(avatar, 'avatars')
      }
      return user.update({
        ...user,
        ...dto,
        avatarPath: avatar ? avatar : user.avatarPath
      })
    } catch (err) {throw new BadRequestException(`Something went wrong! ${err.message}`)}
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id)
    const result = await this.userModel.destroy({where: {id}})
    if (!result) {throw new NotFoundException(`User with id "${id}" was not deleted!`)}
    await this.fileService.removeFile(user.avatarPath)
    return {success: true, message: 'User has been deleted!'}
  }
}
