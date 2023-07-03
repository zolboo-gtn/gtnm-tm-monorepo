import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy as Strategy } from "passport-http";

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (username: string, password: string) => {
    const basicAuth = this.configService.get<{
      username: string;
      password: string;
    }>("basicAuth");

    if (basicAuth.username === username && basicAuth.password === password) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
