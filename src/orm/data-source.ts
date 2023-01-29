import { DataSource } from "typeorm";
import { Companies } from "./entity/Companies";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db_bluebox",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "bluebox",
  synchronize: true,
  logging: true,
  entities: [User, Companies],
  subscribers: [],
  migrations: [],
});
