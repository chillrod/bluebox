import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../orm/data-source";
import { Companies } from "../../../orm/entity/Companies";
import { ErrorResponse } from "../../../presentation/ErrorResponse";

export const CompaniesMiddlewares = {
  companyExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companyId, userId } = req.params;

      const exists = await AppDataSource.getRepository(Companies).exist({
        where: {
          id: companyId,
          userId: { id: userId },
        },
      });

      if (!exists) {
        throw new Error("Company not found");
      }

      next();
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  userAlreadyHasCompanyWithSameName: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      const exists = await AppDataSource.getRepository(Companies).exist({
        where: {
          name: req.body.name,
          userId: { id: userId },
        },
      });

      if (exists) throw new Error("User already has a company with this name");

      next();
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
};
