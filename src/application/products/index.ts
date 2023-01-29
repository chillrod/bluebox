import { Request, Response } from "express";
import { v4 } from "uuid";
import { AppDataSource } from "../../orm/data-source";
import { Companies } from "../../orm/entity/Companies";
import { Products } from "../../orm/entity/Products";
import { ErrorResponse } from "../../presentation/ErrorResponse";
import { SuccessResponse } from "../../presentation/SuccessResponse";

export const ProductsApplication = {
  create: async (req: Request, res: Response) => {
    const { companyId } = req.params;

    try {
      const { name, description, price, image, active } = req.body;

      const product = await AppDataSource.getRepository(Products).save({
        id: v4(),
        company: { id: companyId },
        name,
        description,
        price,
        image,
        active: active || true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return SuccessResponse({
        res,
        req,
        message: "Product created successfully",
        data: {
          id: product.id,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const { name, description, price, image, active } = req.body;

      await AppDataSource.getRepository(Products).update(productId, {
        name,
        description,
        price,
        image,
        active,
        updatedAt: new Date(),
      });

      return SuccessResponse({
        res,
        req,
        message: "Product updated successfully",
        data: {
          id: productId,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      await AppDataSource.getRepository(Products).delete(productId);

      return SuccessResponse({
        res,
        req,
        message: "Product deleted successfully",
        data: {
          id: productId,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await AppDataSource.getRepository(Products).findOne({
        where: {
          id: productId,
        },
      });

      return SuccessResponse({
        res,
        req,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  getAllByCompanieUser: async (req: Request, res: Response) => {
    try {
      const { companyId, userId } = req.params;

      const userIsOwner = await AppDataSource.getRepository(Companies).exist({
        where: {
          userId: { id: userId },
        },
      });

      const products = await AppDataSource.getRepository(Products).find({
        where: {
          company: { id: companyId },
          ...(!userIsOwner && { active: true }),
        },
      });

      return SuccessResponse({
        res,
        req,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    const { companyId } = req.params;
    
    try {
      const products = await AppDataSource.getRepository(Products).find({
        where: {
          company: { id: companyId },
          active: true,
        },
      });

      return SuccessResponse({
        res,
        req,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
};
