import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/modules/database/database.module";
import { JwtStrategy } from "@/strategies/jwt.strategy";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [DatabaseModule],
  providers: [JwtStrategy, UsersService],
})
export class UsersModule {}
