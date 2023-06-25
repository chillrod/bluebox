import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { Group } from "../../orm/entity/Group";

export const GroupMiddlewares = {
  groupExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await AppDataSource.getRepository(Group).findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!group) throw new Error("Group not found");

      next();
    } catch (err: any) {
      next(err);
    }
  },
};
