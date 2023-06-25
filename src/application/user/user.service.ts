import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../orm/data-source";
import { User } from "../../orm/entity/User";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { SuccessResponse } from "../../presentation/SuccessResponse";

export const UserApplication = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = {
        id: v4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
          ? bcrypt.hashSync(req.body.password, 10)
          : "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (!user.name || !user.password || !user.email) {
        throw new Error("Missing user data");
      }

      const userExists = await AppDataSource.getRepository(User).findOne({
        where: {
          email: user.email,
        },
      });

      if (userExists) throw new Error("User already exists");

      await AppDataSource.getRepository(User).save(user);

      return SuccessResponse({
        req,
        res,
        message: "User created successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
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
          email: user?.email,
          createdAt: user?.createdAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await AppDataSource.getRepository(User).find();

      return SuccessResponse({
        req,
        res,
        message: "Users found successfully",
        data: users.map((user) => {
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            createdAt: user?.createdAt,
          };
        }),
      });
    } catch (err: any) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await AppDataSource.getRepository(User).update(req.params.id, {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        updatedAt: new Date(),
      });

      return SuccessResponse({
        req,
        res,
        message: "User updated successfully",
        data: {
          id: req.params.id,
          name: req.body.name,
          email: req.body.email,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await AppDataSource.getRepository(User).delete(req.params.id);

      return SuccessResponse({
        req,
        res,
        message: "User deleted successfully",
        data: {
          id: req.params.id,
          name: req.body.name,
          email: req.body.email,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },
};
