import { Router } from "express";
import { AuthApplication } from "../../application/auth";
import { AuthMiddlewares } from "../../application/auth/middlewares";

const route = Router();

route.post("/", AuthMiddlewares.validCredentials, AuthApplication.sign);

export { route as AuthRoute };
