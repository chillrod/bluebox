import { Request, Response } from "express";
import { v4 } from "uuid";
import { AppDataSource } from "../../orm/data-source";
import { Companies } from "../../orm/entity/Companies";
import { ErrorResponse } from "../../presentation/ErrorResponse";
import { SuccessResponse } from "../../presentation/SuccessResponse";

export const CompaniesApplication = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, zipCode, phone } = req.body;

      const company = {
        id: v4(),
        name,
        zipCode,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: { id: req.params.id },
      };

      await AppDataSource.getRepository(Companies).save(company);

      return SuccessResponse({
        res,
        req,
        message: "Company created successfully",
        data: {
          ...company,
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
      const { id } = req.params;

      const company = await AppDataSource.getRepository(Companies).find({
        where: {
          userId: { id: id },
        },
      });

      return SuccessResponse({
        res,
        req,
        message: "Companies found successfully",
        data: company,
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const company = await AppDataSource.getRepository(Companies).find();

      return SuccessResponse({
        res,
        req,
        message: "Companies found successfully",
        data: company,
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
      const { companyId } = req.params;

      await AppDataSource.getRepository(Companies).delete(companyId);

      return SuccessResponse({
        res,
        req,
        message: "Company deleted successfully",
        data: {
          companyId,
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
      const { companyId } = req.params;

      const { name, zipCode, phone } = req.body;

      const company = {
        name,
        zipCode,
        phone,
        updatedAt: new Date(),
      };

      await AppDataSource.getRepository(Companies).update(companyId, company);

      return SuccessResponse({
        res,
        req,
        message: "Company updated successfully",
        data: company,
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },
};
