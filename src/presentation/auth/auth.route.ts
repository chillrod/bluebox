import { Router } from "express";
import { AuthApplication } from "../../application/auth";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();

route.post("/", UserMiddlewares.userExists, AuthApplication.sign);
route.post(
  "/refresh",
  UserMiddlewares.userExists,
  AuthApplication.refreshToken
);

// route.get("/", UserApplication.getAll);
// route.post("/create", UserApplication.create);
// route.get("/:id", UserApplication.userExists, UserApplication.get);
// route.put("/:id", UserApplication.userExists, UserApplication.update);
// route.delete("/:id", UserApplication.userExists, UserApplication.delete);

export { route as AuthRoute };
