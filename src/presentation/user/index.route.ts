import { Router } from "express";
import { AuthMiddlewares } from "../../application/auth/middlewares";
import { UserApplication } from "../../application/user";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();
const middlewares = [AuthMiddlewares.verifyToken, UserMiddlewares.userExists];

route.get("/", AuthMiddlewares.verifyToken, UserApplication.getAll);
route.post("/create", UserApplication.create);
route.get("/:id", middlewares, UserApplication.get);
route.put("/:id", middlewares, UserApplication.update);
route.delete("/:id", middlewares, UserApplication.delete);

export { route as UserRouter };
