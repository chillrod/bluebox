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

export { route as AuthRoute };
