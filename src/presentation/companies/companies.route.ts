import { Router } from "express";
import { AuthMiddlewares } from "../../application/auth/middlewares";
import { CompaniesApplication } from "../../application/companies";
import { CompaniesMiddlewares } from "../../application/companies/middlewares";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();

route.post(
  "/:id",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.userAlreadyHasCompanyWithSameName,
  ],
  CompaniesApplication.create
);

route.get("/:id", [AuthMiddlewares.verifyToken], CompaniesApplication.get);
route.get("/", CompaniesApplication.getAll);

route.put(
  "/:id/:companyId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
  ],
  CompaniesApplication.update
);

route.delete(
  "/:id/:companyId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
  ],
  CompaniesApplication.delete
);

export { route as CompaniesRoute };
