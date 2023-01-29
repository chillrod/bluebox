import { Router } from "express";
import { AuthMiddlewares } from "../../application/auth/middlewares";
import { CompaniesApplication } from "../../application/companies";
import { companiesMiddlewares } from "../../application/companies/middlewares";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();

const middlewares = [AuthMiddlewares.verifyToken, UserMiddlewares.userExists];

route.post("/:id", middlewares, CompaniesApplication.create);
route.get("/:id", middlewares, CompaniesApplication.get);
route.put(
  "/:id/:companyId",
  [...middlewares, companiesMiddlewares.companyExists],
  CompaniesApplication.update
);
route.delete(
  "/:id/:companyId",
  [...middlewares, companiesMiddlewares.companyExists],
  CompaniesApplication.delete
);

export { route as CompaniesRoute };
