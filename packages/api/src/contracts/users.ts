import { z } from "zod";

import { c } from ".";
import {
  createUserRequestSchema,
  getUserResponseSchema,
  updateUserRequestSchema,
} from "@/schemas/users";

export const usersContract = c.router({
  getUsers: {
    method: "GET",
    path: "/users",
    query: z.object({}),
    responses: {
      200: getUserResponseSchema.array(),
    },
    summary: "",
  },
  getUser: {
    method: "GET",
    path: "/users/:id",
    responses: {
      200: getUserResponseSchema,
    },
    summary: "",
  },
  createUser: {
    method: "POST",
    path: "/users",
    body: createUserRequestSchema,
    responses: {
      200: getUserResponseSchema,
    },
    summary: "",
  },
  updateUser: {
    method: "PATCH",
    path: "/users/:id",
    body: updateUserRequestSchema,
    responses: {
      200: getUserResponseSchema,
    },
    summary: "",
  },
  deleteUser: {
    method: "DELETE",
    path: "/users/:id",
    body: z.null(),
    responses: {
      200: getUserResponseSchema,
    },
    summary: "",
  },
});
