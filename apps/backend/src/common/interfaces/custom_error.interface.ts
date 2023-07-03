import { HttpStatus } from "@nestjs/common";

export interface CustomError {
  // Required
  statusCode: HttpStatus;
  timestamp: string;
  path: string;
  // Optional
  code?: string;
  type?: string;
  message?: string;
}
