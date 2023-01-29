import { Router } from "express";
import { AuthMiddlewares } from "../../application/auth/middlewares";
import { CompaniesApplication } from "../../application/companies";
import { CompaniesMiddlewares } from "../../application/companies/middlewares";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();

route.post(
  "/:id",
  [CompaniesMiddlewares.userAlreadyHasCompanyWithSameName],
  CompaniesApplication.create
);

route.get("/:id", CompaniesApplication.get);

route.put(
  "/:id/:companyId",
  CompaniesMiddlewares.companyExists,
  CompaniesApplication.update
);

route.delete(
  "/:id/:companyId",
  CompaniesMiddlewares.companyExists,
  CompaniesApplication.delete
);

export { route as CompaniesRoute };
