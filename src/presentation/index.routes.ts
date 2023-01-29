import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";
import { CompaniesRoute } from "./companies/companies.route";
import { UserRouter } from "./user/index.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/login", AuthRoute);
router.use("/companies", CompaniesRoute);

export { router };
