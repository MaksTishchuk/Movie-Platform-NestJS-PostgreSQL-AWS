import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getSequelizeConfig} from "./config/sequelize.config";
import { ReviewModule } from './review/review.module';
import { MovieModule } from './movie/movie.module';
import { ViewsModule } from './views/views.module';
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {FilesModule} from "./files/files.module";
import { RatingModule } from './rating/rating.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({serveRoot: '/files', rootPath: path.resolve(__dirname, 'static')}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig
    }),
    AuthModule,
    ReviewModule,
    MovieModule,
    FilesModule,
    ViewsModule,
    RatingModule,
    StatisticsModule,
    UserModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
