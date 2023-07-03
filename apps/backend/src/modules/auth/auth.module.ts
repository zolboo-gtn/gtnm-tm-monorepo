import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { DatabaseModule } from "@/modules/database/database.module";
import { UsersModule } from "@/modules/users/users.module";
import { LocalStrategy } from "@/strategies/local.strategy";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.secret"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
