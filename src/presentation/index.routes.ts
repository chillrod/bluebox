import { Router } from "express";
import { UserRouter } from "./user/index.route";

const router = Router();

router.use("/user", UserRouter);

export { router };
