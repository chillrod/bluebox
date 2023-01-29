import { Router } from "express";
import { AuthMiddlewares } from "../../application/auth/middlewares";
import { CompaniesMiddlewares } from "../../application/companies/middlewares";
import { ProductsApplication } from "../../application/products";
import { ProductsMiddlewares } from "../../application/products/middlewares";
import { UserMiddlewares } from "../../application/user/middlewares";

const route = Router();

route.get(
  "/:userId/:companyId/:productId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
  ],
  ProductsApplication.get
);

route.get(
  "/:userId/:companyId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
  ],
  ProductsApplication.getAll
);

route.post(
  "/:userId/:companyId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
  ],
  ProductsApplication.create
);

route.put(
  "/:userId/:companyId/:productId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
    ProductsMiddlewares.productExists,
  ],
  ProductsApplication.update
);

route.delete(
  "/:userId/:companyId/:productId",
  [
    AuthMiddlewares.verifyToken,
    UserMiddlewares.userExists,
    CompaniesMiddlewares.companyExists,
    ProductsMiddlewares.productExists,
  ],
  ProductsApplication.delete
);

export { route as ProductsRoute };
