import { Controller, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {} from "@ts-rest/core";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { type User, appContract, getUserResponseSchema } from "api";
import bcrypt from "bcryptjs";

import { RequestUser } from "@/decorators/request_user.decorator";
import { JwtAuthGuard } from "@/guards/jwt_auth.guard";
import { LocalAuthGuard } from "@/guards/local_auth.guard";

import { AuthService } from "./auth.service";

const contract = appContract.auth;

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @TsRestHandler(contract.login)
  async login(@RequestUser() user: User) {
    return tsRestHandler(contract.login, async () => {
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
        name: user.name,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        status: 200,
        body: { accessToken },
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.getProfile)
  async getProfile(@RequestUser() user: User) {
    return tsRestHandler(contract.getProfile, async () => {
      return {
        status: 200,
        body: getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.changeEmail)
  async changeEmail(@RequestUser() user: User) {
    return tsRestHandler(contract.changeEmail, async ({ body }) => {
      // TODO: email verification
      await this.authService.changeEmail(user.id, body.email);

      return { status: 200, body: null };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.changePassword)
  async changePassword(@RequestUser() user: User) {
    return tsRestHandler(contract.changePassword, async ({ body }) => {
      const isValid = await bcrypt.compare(body.old_password, user.hash);
      if (!isValid) {
        return { status: 403, body: null };
      }

      await this.authService.changePassword(user.id, body.new_password);
      return { status: 200, body: null };
    });
  }
}
