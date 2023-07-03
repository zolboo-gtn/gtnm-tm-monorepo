import { c } from "@/contracts/index";
import { authContract } from "@/contracts/auth";
import { usersContract } from "@/contracts/users";

export * from "@/schemas/index";
export const appContract = c.router({
  auth: authContract,
  users: usersContract,
});
