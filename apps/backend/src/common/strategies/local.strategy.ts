import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";

import { UsersService } from "@/modules/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.hash))) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
