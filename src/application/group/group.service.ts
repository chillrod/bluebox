import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { IGroup } from "./group.model";
import { AppDataSource } from "../../orm/data-source";
import { Group } from "../../orm/entity/Group";
import { SuccessResponse } from "../../presentation/SuccessResponse";
import { Contact } from "../../orm/entity/Contact";

export const GroupApplication = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const group: IGroup = {
        id: v4(),
        name: req.body.name,
        contacts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (!group.name) {
        throw new Error("Missing group data");
      }

      await AppDataSource.getRepository(Group).save(group);

      return SuccessResponse({
        req,
        res,
        message: "Group created successfully",
        data: <IGroup>{
          id: group.id,
          name: group.name,
          createdAt: group.createdAt,
          contacts: group.contacts,
          updatedAt: group.updatedAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await AppDataSource.getRepository(Group).findOne({
        where: {
          id: req.params.id,
        },
        relations: {
          contacts: true,
        },
      });

      return SuccessResponse({
        req,
        res,
        message: "Group found successfully",
        data: <Group>{
          id: group?.id,
          name: group?.name,
          createdAt: group?.createdAt,
          contacts: group?.contacts,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const group: IGroup[] = await AppDataSource.getRepository(Group).find({
        relations: {
          contacts: true,
        },
      });

      return SuccessResponse({
        req,
        res,
        message: "Groups found successfully",
        data: group.map((group): IGroup => {
          return {
            id: group.id,
            name: group.name,
            createdAt: group.createdAt,
            contacts: group.contacts,
            updatedAt: group.updatedAt,
          };
        }),
      });
    } catch (err: any) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await AppDataSource.getRepository(Group).findOne({
        where: {
          id: req.params.id,
        },
        relations: {
          contacts: true,
        },
      });

      if (!group) throw new Error("Group not found");

      const parsedGroup = {
        ...req.body,
        updatedAt: new Date(),
        contacts: req.body.contacts.map((contact: Contact) => {
          return {
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            group: group,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
          };
        }),
      };

      await AppDataSource.getRepository(Group).save(parsedGroup);

      return SuccessResponse({
        req,
        res,
        message: "User updated successfully",
        data: <Group>{
          id: req.params.id,
          name: req.body.name,
          updatedAt: new Date(),
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await AppDataSource.getRepository(Group).delete(req.params.id);

      return SuccessResponse({
        req,
        res,
        message: "User deleted successfully",
        data: <Group>{
          id: req.params.id,
          name: req.body.name,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },
};
