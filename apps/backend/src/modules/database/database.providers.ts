import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const databaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: "DATABASE",
    useFactory: async (configService: ConfigService) => {
      const url = configService.get<string>("database.url");

      const client = postgres(url, { ssl: "require" });
      const db = drizzle(client);

      return db;
    },
  },
];
