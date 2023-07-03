import { roleEnum, users } from "database";
import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const createUserRequestSchema = createInsertSchema(users)
  .omit({ hash: true })
  .merge(
    z.object({
      email: z.string().email(),
      password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    })
  );
export const getUserResponseSchema = createSelectSchema(users)
  .omit({
    hash: true,
  })
  .merge(
    z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      deletedAt: z.string().nullable(),
    })
  );
export const updateUserRequestSchema = createInsertSchema(users).omit({
  hash: true,
});

export type User = InferModel<typeof users>;
export type SelectUser = z.infer<typeof getUserResponseSchema>;
export type NewUser = z.infer<typeof createUserRequestSchema>;
export type Role = (typeof roleEnum.enumValues)[number];
