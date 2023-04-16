import {ConfigService} from "@nestjs/config";
import {SequelizeModuleOptions} from "@nestjs/sequelize";

export const getSequelizeConfig = async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
  return {
    dialect: "postgres",
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_DATABASE'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    autoLoadModels: true,
    synchronize: true,
    logging: false
  }
}