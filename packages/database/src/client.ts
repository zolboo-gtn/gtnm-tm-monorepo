import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { database } from "./config";

const client = postgres(database.url, { ssl: "require" });
export const db = drizzle(client);

// declare global {
//   var db: PostgresJsDatabase | undefined;
// }
// export const db = global.db || drizzle(client);

// if (process.env.NODE_ENV !== "production") global.db = db;
