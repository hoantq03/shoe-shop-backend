import { ProductEntity } from "../../entity/product.entity";

export class ResProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;

  constructor(product: ProductEntity) {
    Object.assign(this, {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      color: product.color,
    });
  }
}
