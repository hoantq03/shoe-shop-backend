import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const PRODUCT_PREFIX = "products_";

@Entity("products")
export class ProductEntity {
  @PrimaryColumn({
    type: "character varying",
    nullable: false,
    name: "id",
  })
  id!: string;

  @Column({
    type: "character varying",
    nullable: false,
    length: 100,
    name: "name",
  })
  name!: string;

  @Column({
    type: "character varying",
    nullable: false,
    length: 255,
    name: "image",
  })
  image!: string;

  @Column({ type: "character varying", nullable: false, name: "description" })
  description!: string;

  @Column({ type: "decimal", precision: 2, name: "price", default: 0 })
  price!: number;

  @Column({ type: "character varying", nullable: false, name: "color" })
  color!: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt?: Date;

  @Column({ name: "created_by", default: () => "1" })
  createdBy?: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt?: Date;

  @Column({ name: "updated_by", default: () => "1" })
  updatedBy?: string;

  // methods
  static createProductId(id?: string): string {
    return id ? id : `${PRODUCT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
