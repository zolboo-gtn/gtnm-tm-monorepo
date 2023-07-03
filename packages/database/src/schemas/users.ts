import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "super_admin", "user"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: roleEnum("role").notNull(),
  hash: text("hash").notNull(),
  cardId: text("cardId"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
