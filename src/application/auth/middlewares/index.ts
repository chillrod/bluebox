import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../presentation/ErrorResponse";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../orm/data-source";
import { User } from "../../../orm/entity/User";

export const AuthMiddlewares = {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token not found");

      jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
        if (err) {
          return ErrorResponse({
            res,
            message: "Token is not valid",
          });
        } else {
          res.locals.email = decode;
          res.locals.token = token;

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
  async isSameUser(req: Request, res: Response, next: NextFunction) {
    try {
      const isUserEmail = await AppDataSource.getRepository(User).findOne({
        where: {
          id: req.params.id,
        },
      });

      const isNotSameUser = isUserEmail?.email !== jwt.decode(res.locals.token);

      if (isNotSameUser) {
        throw new Error("You are not authorized to access this user");
      } else {
        next();
      }
    } catch (error: any) {
      return ErrorResponse({
        res,
        message: error.message,
      });
    }
  },
};
