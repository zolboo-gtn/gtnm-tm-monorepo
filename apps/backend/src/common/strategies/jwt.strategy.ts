import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Role } from "api";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "@/modules/users/users.service";
import { ConfigService } from "@nestjs/config";

type JWTPayload = {
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: Role;
  sub: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwt.secret"),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.usersService.getUserByEmail(payload.email);

    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
