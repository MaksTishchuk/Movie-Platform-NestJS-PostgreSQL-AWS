import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "../../user/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({id}: Pick<UserModel, 'id'>): Promise<UserModel> {
    return await this.userModel.findByPk(id)
  }
}