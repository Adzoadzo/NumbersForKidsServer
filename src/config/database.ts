import { ConnectionOptions, createConnection } from "typeorm";
import { dbModels } from "./models";

export const DevelopmentORMConfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: dbModels,
  extra: { options: { encrypt: true } },
  synchronize: true,
  //   migrations: ["migration/*.js"],
  cli: {
    migrationsDir: "migration",
  },
};

console.log(
  DevelopmentORMConfig.host,
  DevelopmentORMConfig.username,
  DevelopmentORMConfig.synchronize
);
export const connection = createConnection(DevelopmentORMConfig);
