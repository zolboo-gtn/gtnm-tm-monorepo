import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { type User } from "api";

export interface RequestUser extends Request {
  user: User;
}
export const RequestUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest<RequestUser>();

    return user;
  },
);
