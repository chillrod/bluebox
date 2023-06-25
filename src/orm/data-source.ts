import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Integrations } from "./entity/Integrations";
import { Contact } from "./entity/Contact";
import { Group } from "./entity/Group";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db_bluebox",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "bluebox",
  synchronize: true,
  logging: true,
  entities: [User, Integrations, Group, Contact],
  subscribers: [],
  migrations: [],
});
