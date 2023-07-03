import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { configuration } from "@/config/configuration";
import { validationSchema } from "@/config/validation_schema";
import { AuthModule } from "@/modules/auth/auth.module";
import { DatabaseModule } from "@/modules/database/database.module";
import { UsersModule } from "@/modules/users/users.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (config) => {
        const result = validationSchema.safeParse(config);

        if (result.success === false) {
          console.log(JSON.stringify(result.error.errors));
          throw new Error("ERROR");
        }

        return result.data;
      },
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
