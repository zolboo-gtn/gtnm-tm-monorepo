import { z } from "zod";
import { getUserResponseSchema } from "./users";

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
export const loginResponseSchema = z.object({
  accessToken: z.string(),
});
export const changeEmailRequestSchema = z.object({
  email: z.string().email(),
});
export const changePasswordRequestSchema = z.object({
  old_password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  new_password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
