import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { IContact } from "./contact.model";
import { AppDataSource } from "../../orm/data-source";
import { Contact } from "../../orm/entity/Contact";
import { SuccessResponse } from "../../presentation/SuccessResponse";

export const ContactApplication = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const contact: IContact = {
        id: v4(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
        group: req.body.group,
      };

      if (!contact.name) {
        throw new Error("Missing contact data");
      }

      await AppDataSource.getRepository(Contact).save(contact);

      return SuccessResponse({
        req,
        res,
        message: "Contact created successfully",
        data: <IContact>{
          createdAt: contact.createdAt,
          email: contact.email,
          id: contact.id,
          name: contact.name,
          updatedAt: contact.updatedAt,
          group: contact.group,
          phone: contact.phone,
          lastContactedAt: contact.lastContactedAt,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const contact = await AppDataSource.getRepository(Contact).findOne({
        where: {
          id: req.params.id,
        },
        relations: {
          group: true,
        },
      });

      return SuccessResponse({
        req,
        res,
        message: "Contact found successfully",
        data: <Contact>{
          id: contact?.id,
          name: contact?.name,
          createdAt: contact?.createdAt,
          group: contact?.group,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const contacts: IContact[] = await AppDataSource.getRepository(
        Contact
      ).find({
        relations: {
          group: true,
        },
      });

      return SuccessResponse({
        req,
        res,
        message: "Contacts found successfully",
        data: contacts.map((contact): Contact => {
          return {
            id: contact?.id,
            name: contact?.name,
            createdAt: contact?.createdAt,
            group: contact?.group,
            email: contact?.email,
            phone: contact?.phone,
            updatedAt: contact?.updatedAt,
            lastContactedAt: contact?.lastContactedAt,
          };
        }),
      });
    } catch (err: any) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await AppDataSource.getRepository(Contact).update(req.params.id, {
        ...req.body,
        updatedAt: new Date(),
      });

      return SuccessResponse({
        req,
        res,
        message: "User updated successfully",
        data: <IContact>{
          id: req.body?.id,
          name: req.body?.name,
          createdAt: req.body?.createdAt,
          phone: req.body?.phone,
          group: req.body?.group,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await AppDataSource.getRepository(Contact).delete(req.params.id);

      return SuccessResponse({
        req,
        res,
        message: "Contact deleted successfully",
        data: <IContact>{
          id: req.params.id,
          name: req.body.name,
        },
      });
    } catch (err: any) {
      next(err);
    }
  },
};
