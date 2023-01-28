import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";

import { AppDataSource } from "./orm/data-source";

import { router } from "./presentation/index.routes";

const app = express();

dotenv.config();

app.use(express.json());
app.use(router);

const start = () => {
  AppDataSource.initialize().catch((err) => {
    console.log("ORM-err", err);
  });

  app.listen(3333, () => {
    console.log("Server is running!");
  });
};

start();
