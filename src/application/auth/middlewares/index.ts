import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../presentation/ErrorResponse";

import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../orm/data-source";
import { User } from "../../../orm/entity/User";

import bcrypt from "bcryptjs";

export const AuthMiddlewares = {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token not found");

      jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
        if (err) {
          throw new Error("Invalid token");
        } else {
          res.locals.email = decode;
          res.locals.token = token;

          next();
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async validCredentials(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          email: req.body.email,
        },
      });

      const comparePass = await bcrypt.compare(
        req.body.password,
        user?.password || ""
      );

      if (!comparePass) throw new Error("Invalid credentials");

      next();
    } catch (err) {
      next(err);
    }
  },
};
