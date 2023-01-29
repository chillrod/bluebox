import { Router } from "express";
import { AuthMiddlewares } from "../application/auth/middlewares";
import { UserMiddlewares } from "../application/user/middlewares";
import { AuthRoute } from "./auth/auth.route";
import { CompaniesRoute } from "./companies/companies.route";
import { ProductsRoute } from "./products/products.route";
import { UsersRoute } from "./user/index.route";

const router = Router();

router.use("/user", UsersRoute);
router.use("/login", AuthRoute);

router.use(
  "/companies",
  [AuthMiddlewares.verifyToken, UserMiddlewares.userExists],
  CompaniesRoute
);

router.use(
  "/products",
  [AuthMiddlewares.verifyToken, UserMiddlewares.userExists],
  ProductsRoute
);

export { router };
