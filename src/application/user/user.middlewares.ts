import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { User } from "../../orm/entity/User";

export const UserMiddlewares = {
  isSameUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) throw new Error("User not found");

      if (user.id !== req.params.id)
        throw new Error("You can only update your own data");

      next();
    } catch (err: any) {
      next(err);
    }
  },

  userExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) throw new Error("User not found");

      next();
    } catch (err: any) {
      next(err);
    }
  },
};
