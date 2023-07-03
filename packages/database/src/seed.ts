import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { database } from "./config";

const client = postgres(database.url);
const db = drizzle(client);

const main = async () => {
  try {
    await client.end();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
};

main();
