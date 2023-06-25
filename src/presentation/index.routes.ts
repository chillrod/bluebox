import { Router } from "express";

import { AuthRoute } from "./auth/auth.route";
import { UsersRoute } from "./user/index.route";

const router = Router();

router.use("/user", UsersRoute);
router.use("/login", AuthRoute);

export { router };
