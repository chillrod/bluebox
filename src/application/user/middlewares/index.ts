import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../orm/data-source";
import { User } from "../../../orm/entity/User";
import { ErrorResponse } from "../../../presentation/ErrorResponse";

export const UserMiddlewares = {
  userExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userExists = await AppDataSource.getRepository(User).exist({
        where: {
          id: req.params.id,
        },
      });

      if (!userExists) throw new Error("User does not exists");

      return next();
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
};
