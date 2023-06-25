import { Response } from "express";
interface IErrorResponse {
  res: Response;
  message: string;
  errors?: string[];
  status?: number;
}

export const ErrorResponse = (props: IErrorResponse) => {
  return props.res.status(props.status || 500).json({
    success: false,
    data: {
      message: props.message,
      errors: props.errors,
    },
  });
};
