import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../presentation/ErrorResponse";

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  console.log("🚀 ~ file: request-interceptor.ts:10 ~ error:", error);
  const statusCode = error?.status;

  return ErrorResponse({
    res: response,
    message: error.message,
    status: statusCode,
  });
};
