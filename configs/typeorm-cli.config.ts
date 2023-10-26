import { DataSource } from "typeorm";
import { ProductEntity } from "../entity/product.entity";
import { CreateProductTable1697943711606 } from "../migrations/1697943711606-create-product-table";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "problem5",
  synchronize: false,
  logging: false,
  entities: [ProductEntity],
  migrations: [CreateProductTable1697943711606],
  subscribers: [],
});
