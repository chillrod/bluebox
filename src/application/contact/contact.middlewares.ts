import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { Contact } from "../../orm/entity/Contact";

export const ContactMiddlewares = {
  contactExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact = await AppDataSource.getRepository(Contact).findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!contact) throw new Error("Contact not found");
      next();
    } catch (err: any) {
      next(err);
    }
  },

  uniquePhone: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact = await AppDataSource.getRepository(Contact).findOne({
        where: {
          phone: req.body.phone,
        },
      });

      if (contact) throw new Error("Phone already exists");
      next();
    } catch (err: any) {
      next(err);
    }
  },
};
