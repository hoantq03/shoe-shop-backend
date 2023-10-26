export const PG_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  ssl: false,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};
