import { Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { User } from "../../orm/entity/User";
import bcrypt from "bcryptjs";
import { SuccessResponse } from "../../presentation/SuccessResponse";
import { ErrorResponse } from "../../presentation/ErrorResponse";
import jwt from "jsonwebtoken";

export const AuthApplication = {
  sign: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          email: email,
        },
      });

      const comparePass = await bcrypt.compare(password, user?.password || "");

      if (!comparePass) {
        return ErrorResponse({
          res,
          message: "Invalid password or email",
        });
      }

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
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const token = jwt.sign(email, process.env.JWT_SECRET as string);

      return SuccessResponse({
        req,
        res,
        message: "Token refreshed successfully",
        data: {
          email,
          token: token,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
};
