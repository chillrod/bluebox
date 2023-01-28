import { Response } from "express";
interface IErrorResponse {
  res: Response;
  message: string;
  errors?: string[];
}

export const ErrorResponse = (props: IErrorResponse) => {
  return props.res.status(400).json({
    success: false,
    data: {
      message: props.message,
      errors: props.errors,
    },
  });
};
