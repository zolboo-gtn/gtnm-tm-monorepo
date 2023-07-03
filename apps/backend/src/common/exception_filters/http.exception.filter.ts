import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

import { CustomError } from "@/interfaces/custom_error.interface";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("HttpException");

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse: CustomError = {
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      code: exception.name,
      message: exception.message,
    };
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
