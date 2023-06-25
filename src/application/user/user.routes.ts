import { Router } from "express";
import { AuthMiddlewares } from "../auth/auth.middlewares";
import { UserApplication } from "./user.service";
import { UserMiddlewares } from "./user.middlewares";

const route = Router();

route.post("/create", UserApplication.create);

route.get("/", AuthMiddlewares.verifyToken, UserApplication.getAll);

route.get(
  "/:id",
  [AuthMiddlewares.verifyToken, UserMiddlewares.userExists],
  UserApplication.get
);

route.put(
  "/:id",
  [AuthMiddlewares.verifyToken, UserMiddlewares.isSameUser],
  UserApplication.update
);

route.delete(
  "/:id",
  [AuthMiddlewares.verifyToken, UserMiddlewares.isSameUser],
  UserApplication.delete
);

export { route as UsersRoute };
