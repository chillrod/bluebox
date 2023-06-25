import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../presentation/ErrorResponse";

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  const statusCode = error?.status;

  return ErrorResponse({
    res: response,
    message: error.message,
    status: statusCode,
  });
};
