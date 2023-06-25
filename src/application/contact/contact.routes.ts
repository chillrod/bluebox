import { Router } from "express";
import { ContactApplication } from "./contact.service";
import { AuthMiddlewares } from "../auth/auth.middlewares";
import { ContactMiddlewares } from "./contact.middlewares";

const route = Router();

route.post("/", [ContactMiddlewares.uniquePhone], ContactApplication.create);

route.get(
  "/:id",
  [AuthMiddlewares.verifyToken, ContactMiddlewares.contactExists],
  ContactApplication.get
);

route.get("/", AuthMiddlewares.verifyToken, ContactApplication.getAll);

route.put(
  "/:id",
  [AuthMiddlewares.verifyToken, ContactMiddlewares.contactExists],
  ContactApplication.update
);

route.delete(
  "/:id",
  [AuthMiddlewares.verifyToken, ContactMiddlewares.contactExists],
  ContactApplication.delete
);

export { route as ContactRoute };
