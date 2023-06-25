import { Router } from "express";
import { GroupApplication } from "./group.service";

const route = Router();

route.post("/", GroupApplication.create);
route.get("/:id", GroupApplication.get);
route.get("/", GroupApplication.getAll);
route.put("/:id", GroupApplication.update);
route.delete("/:id", GroupApplication.delete);

export { route as AuthRoute };
