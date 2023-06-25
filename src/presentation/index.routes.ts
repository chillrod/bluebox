import { Router } from "express";

import { AuthRoute } from "../application/auth/auth.routes";
import { UsersRoute } from "../application/user/user.routes";

const router = Router();

router.use("/user", UsersRoute);
router.use("/login", AuthRoute);

export { router };
