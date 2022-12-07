import { Request, Response, Router } from "express";

const route = Router();

route.get("/", (req: Request, res: Response) => {
  return res.json({ message: "search" });
});

export { route as TorrentSearchRouter };
