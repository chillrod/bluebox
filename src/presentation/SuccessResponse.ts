import { Response, Request } from "express";
interface ISuccessResponse {
  res: Response;
  req: Request;
  message: string;
  data: unknown;
}
const parseStatus = (req: Request) => {
  const state: {
    [key: string]: number;
  } = {
    post: 201,
    update: 200,
    get: 200,
    delete: 200,
    put: 200,
  };

  return state[req.method.toLowerCase()];
};

export const SuccessResponse = (props: ISuccessResponse) => {
  return props.res.status(parseStatus(props.req)).json({
    success: true,
    data: {
      message: props.message,
      result: props.data,
    },
  });
};
