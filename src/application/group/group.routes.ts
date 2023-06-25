import { Router } from "express";
import { GroupApplication } from "./group.service";
import { AuthMiddlewares } from "../auth/auth.middlewares";
import { GroupMiddlewares } from "./group.middlewares";

const route = Router();

route.post("/", GroupApplication.create);

route.get(
  "/:id",
  [AuthMiddlewares.verifyToken, GroupMiddlewares.groupExists],
  GroupApplication.get
);

route.get("/", [AuthMiddlewares.verifyToken], GroupApplication.getAll);

route.put(
  "/:id",
  [AuthMiddlewares.verifyToken, GroupMiddlewares.groupExists],
  GroupApplication.update
);

route.delete(
  "/:id",
  [AuthMiddlewares.verifyToken, GroupMiddlewares.groupExists],
  GroupApplication.delete
);

export { route as GroupRoute };
