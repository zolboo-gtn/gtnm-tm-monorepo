import { Inject, Injectable } from "@nestjs/common";
import type { NewUser } from "api";
import bcrypt from "bcryptjs";
import { users } from "database";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

@Injectable()
export class UsersService {
  constructor(@Inject("DATABASE") private db: PostgresJsDatabase) {}
  async getUsers() {
    return await this.db.select().from(users);
  }
  async getUserById(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    const user = result.find(Boolean);

    return user;
  }
  async getUserByEmail(email: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    const user = result.find(Boolean);

    return user;
  }
  async createUser({ password, ...data }: NewUser) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await this.db.insert(users).values({ ...data, hash });

    const user = result.find(Boolean);
    console.log(user);

    return user;
  }
  async updateUser(id: number, data: Partial<NewUser>) {
    const result = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id));
    const user = result.find(Boolean);

    return user;
  }
  async deleteUser(id: number) {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
