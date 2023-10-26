import { ConnectOptions } from "typeorm";

const config: ConnectOptions = {
  //@ts-ignore
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "./**/*.entity.{js,ts}"],
  migrations: ["problem5/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "problem5/migrations",
  },
};

export = config;
