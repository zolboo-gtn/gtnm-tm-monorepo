import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { DrizzleError } from "drizzle-orm";
import { Request, Response } from "express";
import produce from "immer";

import { CustomError } from "@/interfaces/custom_error.interface";

@Catch()
export class DrizzleErrorFilter implements ExceptionFilter {
  catch(error: DrizzleError, host: ArgumentsHost) {
    console.log("DrizzleError");

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse: CustomError = {
      code: error.name,
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: error.message,
    };

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
