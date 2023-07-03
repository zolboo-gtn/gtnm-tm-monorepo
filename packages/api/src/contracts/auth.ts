import { z } from "zod";

import {
  changeEmailRequestSchema,
  changePasswordRequestSchema,
  getUserResponseSchema,
  loginRequestSchema,
  loginResponseSchema,
} from "@/schemas/index";

import { c } from ".";

export const authContract = c.router({
  login: {
    method: "POST",
    path: "/login",
    body: loginRequestSchema,
    responses: {
      200: loginResponseSchema,
    },
    summary: "",
  },
  getProfile: {
    method: "GET",
    path: "/profile",
    responses: {
      200: getUserResponseSchema,
    },
    summary: "",
  },
  changeEmail: {
    method: "PATCH",
    path: "/change_email",
    body: changeEmailRequestSchema,
    responses: {
      200: z.null(),
      400: z.null(),
    },
    summary: "",
  },
  changePassword: {
    method: "PATCH",
    path: "/change_password",
    body: changePasswordRequestSchema,
    responses: {
      200: z.null(),
    },
    summary: "",
  },
});
