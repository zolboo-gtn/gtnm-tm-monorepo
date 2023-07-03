import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from "@nestjs/common";
import { type Role } from "api";

import { RequestUser } from "@/decorators/request_user.decorator";
import { JwtAuthGuard } from "@/guards/jwt_auth.guard";
import { UsersService } from "@/modules/users/users.service";

export const JwtRoleGuard = (
  ...requiredRoles: (Role | "owner")[]
): Type<CanActivate> => {
  @Injectable()
  class JwtRoleGuardMixin extends JwtAuthGuard {
    constructor(private readonly usersService: UsersService) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);

      // EMPTY
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const { params, user } = context.switchToHttp().getRequest<RequestUser>();

      //
      if (requiredRoles.some((role) => user.role === role)) {
        return true;
      }

      // OWNER
      if (requiredRoles.includes("owner")) {
        // FIXME: check resource owner
        const resource = await this.usersService.getUserById(+params.id);
        return resource.id === user.id;
      }

      return false;
    }
  }

  return mixin(JwtRoleGuardMixin);
};
