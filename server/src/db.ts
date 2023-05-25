import { DataSource } from "typeorm";
import Country from "./entity/Country";

const db = new DataSource({
  type: "sqlite",
  database: "checkpoint.sqlite",
  entities: [Country],
  synchronize: true,
});

export default db;
