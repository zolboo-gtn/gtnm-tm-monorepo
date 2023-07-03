import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import produce from "immer";
import { PostgresError } from "postgres";

import { CustomError } from "@/interfaces/custom_error.interface";

@Catch()
export class PostgresErrorFilter implements ExceptionFilter {
  catch(error: PostgresError, host: ArgumentsHost) {
    console.log("PostgresError", error);

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
    // if (error instanceof PrismaClientRustPanicError) {
    //   errorResponse = produce(errorResponse, (draft) => {
    //     draft.message = error.message;
    //   });
    // } else if (error instanceof PrismaClientValidationError) {
    //   errorResponse = produce(errorResponse, (draft) => {
    //     draft.message = error.message;
    //   });
    // } else if (error instanceof PrismaClientKnownRequestError) {
    //   errorResponse = produce(errorResponse, (draft) => {
    //     // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
    //     if (error.code === "P2025") {
    //       draft.statusCode = HttpStatus.NOT_FOUND;
    //     }
    //     draft.code = error.code;
    //     draft.message = error.message;
    //   });
    // } else if (error instanceof PrismaClientInitializationError) {
    //   errorResponse = produce(errorResponse, (draft) => {
    //     draft.message = error.message;
    //   });
    // } else {
    //   errorResponse = produce(errorResponse, (draft) => {
    //     draft.message = error.message;
    //   });
    // }

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
