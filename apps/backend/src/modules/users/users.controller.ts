import { Controller, UseGuards } from "@nestjs/common";
import {} from "@ts-rest/core";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { appContract, getUserResponseSchema } from "api";

import { JwtRoleGuard } from "@/guards/role.guard";

import { UsersService } from "./users.service";

const contract = appContract.users;

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtRoleGuard("admin"))
  @TsRestHandler(contract.getUsers)
  async getUsers() {
    return tsRestHandler(contract.getUsers, async () => {
      const users = await this.usersService.getUsers();

      return {
        status: 200,
        body: users.map((user) =>
          getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
        ),
      };
    });
  }

  @TsRestHandler(contract.getUser)
  async getUser() {
    return tsRestHandler(contract.getUser, async ({ params: { id } }) => {
      const user = await this.usersService.getUserById(Number(id));

      if (!user) {
        return { status: 404, body: null };
      }

      return {
        status: 200,
        body: getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
      };
    });
  }

  @UseGuards(JwtRoleGuard("super_admin"))
  @TsRestHandler(contract.createUser)
  async createUser() {
    return tsRestHandler(contract.createUser, async ({ body }) => {
      const user = await this.usersService.createUser(body);

      return {
        status: 201,
        body: getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
      };
    });
  }

  @UseGuards(JwtRoleGuard("admin", "owner"))
  @TsRestHandler(contract.updateUser)
  async updateUser() {
    return tsRestHandler(
      contract.updateUser,
      async ({ body, params: { id } }) => {
        const user = await this.usersService.updateUser(Number(id), body);

        return {
          status: 200,
          body: getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
        };
      },
    );
  }

  @UseGuards(JwtRoleGuard("admin", "owner"))
  @TsRestHandler(contract.deleteUser)
  async deleteUser() {
    return tsRestHandler(contract.deleteUser, async ({ params: { id } }) => {
      const user = await this.usersService.deleteUser(Number(id));

      return {
        status: 200,
        body: getUserResponseSchema.parse(JSON.parse(JSON.stringify(user))),
      };
    });
  }
}
