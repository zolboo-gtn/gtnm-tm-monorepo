import { getUserResponseSchema } from "api";
import { z } from "zod";

export const Session = getUserResponseSchema.pick({ role: true }).extend({
  accessToken: z.string(),
});
export type Session = z.infer<typeof Session>;
