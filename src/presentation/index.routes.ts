import { Router } from "express";
import { TorrentSearchRouter } from "./torrent-search/index.route";

const router = Router();

router.use("/search", TorrentSearchRouter);

export { router };
