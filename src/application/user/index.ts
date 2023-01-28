import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { User } from "../../orm/entity/User";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { ErrorResponse } from "../../presentation/ErrorResponse";
import { SuccessResponse } from "../../presentation/SuccessResponse";

export const UserApplication = {
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

  async create(req: Request, res: Response) {
    try {
      const user = {
        id: v4(),
        name: req.body.name,
        password: req.body.password
          ? await bcrypt.hash(req.body.password, 10)
          : "",
      };

      if (!user.name || !user.password) {
        throw new Error("Missing user data");
      }

      await AppDataSource.getRepository(User).save(user);

      return SuccessResponse({
        req,
        res,
        message: "User created successfully",
        data: {
          id: user.id,
          name: user.name,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: req.params.id,
        },
      });

      return SuccessResponse({
        req,
        res,
        message: "User found successfully",
        data: {
          id: user?.id,
          name: user?.name,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const users = await AppDataSource.getRepository(User).find();

      return SuccessResponse({
        req,
        res,
        message: "Users found successfully",
        data: users.map((user) => ({
          id: user.id,
          name: user.name,
        })),
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      await AppDataSource.getRepository(User).update(req.params.id, {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
      });

      return SuccessResponse({
        req,
        res,
        message: "User updated successfully",
        data: {
          id: req.params.id,
          name: req.body.name,
        },
      });
    } catch (err: any) {
      return ErrorResponse({
        res,
        message: err.message,
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await AppDataSource.getRepository(User).delete(req.params.id);

      return SuccessResponse({
        req,
        res,
        message: "User deleted successfully",
        data: {
          id: req.params.id,
          name: req.body.name,
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
