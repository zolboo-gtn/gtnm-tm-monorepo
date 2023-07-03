import { Inject, Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { users } from "database";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

@Injectable()
export class AuthService {
  constructor(@Inject("DATABASE") private db: PostgresJsDatabase) {}

  async changeEmail(id: number, email: string) {
    return await this.db.update(users).set({ email }).where(eq(users.id, id));
  }
  async changePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return await this.db.update(users).set({ hash }).where(eq(users.id, id));
  }
}
