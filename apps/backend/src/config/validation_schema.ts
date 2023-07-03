import { z } from "zod";

export const validationSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});
