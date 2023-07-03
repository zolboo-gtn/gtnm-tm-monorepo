import { type NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { DrizzleErrorFilter } from "@/exception_filters/drizzle_error.filter";
import { HttpExceptionFilter } from "@/exception_filters/http.exception.filter";
import { PostgresErrorFilter } from "@/exception_filters/postgres_error.filter";
import { AppModule } from "@/modules/app/app.module";
import { setupSwagger } from "./swagger";

const bootstrap = async () => {
  //
  const config: NestApplicationOptions = {
    bufferLogs: true,
    cors: {
      origin: "http://localhost:3000",
    },
  };
  const app = await NestFactory.create(AppModule, config);

  //
  // app.useGlobalFilters(
  //   new DrizzleErrorFilter(),
  //   new HttpExceptionFilter(),
  //   new PostgresErrorFilter(),
  // );

  //
  setupSwagger(app);

  await app.listen(3001);
};
bootstrap();
