import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {FilesService} from "../files/files.service";

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel])
  ],
  controllers: [UserController],
  providers: [UserService, FilesService],
  exports: [UserService]
})
export class UserModule {}
