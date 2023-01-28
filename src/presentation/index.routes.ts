import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";
import { UserRouter } from "./user/index.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/login", AuthRoute);

export { router };
