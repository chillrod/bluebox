import { Router } from "express";
import { AuthApplication } from "./auth.service";
import { AuthMiddlewares } from "./auth.middlewares";

const route = Router();

route.post("/", AuthMiddlewares.validCredentials, AuthApplication.sign);

export { route as AuthRoute };
