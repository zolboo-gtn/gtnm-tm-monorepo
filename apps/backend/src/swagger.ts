import { type INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { generateOpenApi } from "@ts-rest/open-api";
import { appContract } from "api";

export const setupSwagger = (app: INestApplication) => {
  const document = generateOpenApi(appContract, {
    info: {
      title: "Time management API",
      version: "0.0.0",
    },
  });

  SwaggerModule.setup("api", app, document);
};
