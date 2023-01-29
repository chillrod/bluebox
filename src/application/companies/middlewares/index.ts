import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../orm/data-source";
import { Companies } from "../../../orm/entity/Companies";
import { ErrorResponse } from "../../../presentation/ErrorResponse";

export const companiesMiddlewares = {
  companyExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companyId } = req.params;

      const exists = await AppDataSource.getRepository(Companies).exist({
        where: {
          id: companyId,
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
};
