import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../orm/data-source";
import { Products } from "../../../orm/entity/Products";
import { ErrorResponse } from "../../../presentation/ErrorResponse";

export const ProductsMiddlewares = {
  productExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;

      const exists = await AppDataSource.getRepository(Products).exist({
        where: {
          id: productId,
        },
      });

      if (!exists) throw new Error("Product not found");

      next();
    } catch (error: any) {
      return ErrorResponse({
        res,
        message: error.message,
      });
    }
  },
};
