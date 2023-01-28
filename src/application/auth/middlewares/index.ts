import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../presentation/ErrorResponse";
import jwt from "jsonwebtoken";

export const AuthMiddlewares = {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token not found");

      jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
        if (err) {
          return ErrorResponse({
            res,
            message: "Token is not valid",
          });
        } else {
          next();
        }
      });
    } catch (error: any) {
      return ErrorResponse({
        res,
        message: error.message,
      });
    }
  },
};
