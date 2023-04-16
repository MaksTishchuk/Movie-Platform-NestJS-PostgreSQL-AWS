import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {UserService} from "../user.service";
import {EnumUserRoles} from "../user.model";

@Injectable()
export class ModeratorRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    if (request?.user) {
      const user = await this.userService.getUserById(request.user.id)
      return (user.role === EnumUserRoles.MODERATOR || user.role === EnumUserRoles.ADMIN)
    }
    return false
  }
}