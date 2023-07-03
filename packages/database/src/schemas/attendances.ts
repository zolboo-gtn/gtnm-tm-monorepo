import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const statusEnum = pgEnum("status", [
  "approved",
  "cancelled",
  "declined",
  "pending",
]);
export const typeEnum = pgEnum("type", [
  "dayoff",
  "holiday",
  "office",
  "remote",
  "sick",
]);

export const attendances = pgTable("attendances", {
  id: serial("id").primaryKey(),
  comment: text("comment"),
  status: statusEnum("status").default("pending").notNull(),
  type: typeEnum("type").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  start: timestamp("start").defaultNow(),
  end: timestamp("end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  evaluatedAt: timestamp("evaluated_at"),
  evaluatedBy: integer("evaluated_by").references(() => users.id),
});
