import { Router } from "express";

import { AuthRoute } from "../application/auth/auth.routes";
import { UsersRoute } from "../application/user/user.routes";
import { GroupRoute } from "../application/group/group.routes";
import { ContactRoute } from "../application/contact/contact.routes";

const router = Router();

router.use("/user", UsersRoute);
router.use("/login", AuthRoute);
router.use("/group", GroupRoute);
router.use("/contacts", ContactRoute);

export { router };
