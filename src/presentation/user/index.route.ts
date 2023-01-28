import { Router } from "express";
import { UserApplication } from "../../application/user";

const route = Router();

route.get("/", UserApplication.getAll);
route.post("/create", UserApplication.create);
route.get("/:id", UserApplication.userExists, UserApplication.get);
route.put("/:id", UserApplication.userExists, UserApplication.update);
route.delete("/:id", UserApplication.userExists, UserApplication.delete);

export { route as UserRouter };
