import { date, integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const remoteSheets = pgTable("remote_sheets", {
  id: serial("id").primaryKey(),
  date: date("date"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
