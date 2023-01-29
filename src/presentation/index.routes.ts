import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";
import { CompaniesRoute } from "./companies/companies.route";
import { ProductsRoute } from "./products/products.route";
import { UsersRoute } from "./user/index.route";

const router = Router();

router.use("/user", UsersRoute);
router.use("/login", AuthRoute);
router.use("/companies", CompaniesRoute);
router.use("/products", ProductsRoute);

export { router };
