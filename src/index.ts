import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { AppDataSource } from "./orm/data-source";

import { router } from "./presentation/index.routes";
import { errorHandler } from "./middlewares/request-interceptor";

const app = express();

dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

const start = () => {
  AppDataSource.initialize().catch((err) => {
    console.log("ORM-err", err);
  });

  app.listen(3333, () => {
    console.log("Server is running!");
  });
};

start();
