import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../presentation/SuccessResponse";
import { ErrorResponse } from "../../presentation/ErrorResponse";
import jwt from "jsonwebtoken";

export const AuthApplication = {
  sign: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const token = jwt.sign(email, process.env.JWT_SECRET as string);

      return SuccessResponse({
        req,
        res,
        message: "User logged successfully",
        data: {
          email,
          token: token,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },
};
