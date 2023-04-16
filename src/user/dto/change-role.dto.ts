import {IsEnum, NotEquals} from "class-validator";
import {EnumUserRoles} from "../user.model";

export class ChangeRoleDto {
  @IsEnum(EnumUserRoles)
  @NotEquals(EnumUserRoles.ADMIN)
  role: EnumUserRoles

  // @NotEquals(AppState[AppState.RUNNING])
}