import { Repository } from "typeorm";
import { ProductEntity } from "../entity/product.entity";
import { TReqInsertProduct, TReqUpdateProduct } from "../types/product.type";
import { ResProductDto } from "./dto/resProducts.dto";
import { myDataSource } from "../configs/index";
import { DatabaseConnectionError } from "../exceptions/database-connection-error";

myDataSource
  .initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => {
    throw new DatabaseConnectionError();
  });

export class ProductService {
  private productRepo: Repository<ProductEntity>;

  constructor() {
    this.productRepo = myDataSource.getRepository(ProductEntity);
  }
  async getAllProducts(): Promise<ResProductDto[]> {
    const prods = await this.productRepo.find({});
    const prodsDto: ResProductDto[] = [];
    prods.forEach((prod) => {
      prodsDto.push(new ResProductDto(prod));
    });
    return prodsDto;
  }

  async getProduct(id: string): Promise<ResProductDto | null> {
    const prod: ProductEntity = await this.productRepo.findOne({
      where: { id },
    });
    if (!prod) {
      return null;
    }
    return new ResProductDto(prod);
  }

  async updateProduct(
    productProps: TReqUpdateProduct,
    productId: string
  ): Promise<ResProductDto> {
    const oldProduct: ProductEntity | null = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!oldProduct) {
      //product not found error
      console.log("product not found error");
      return;
    }

    // update product
    oldProduct.name = productProps.name ?? oldProduct.name;
    oldProduct.description = productProps.description ?? oldProduct.description;
    oldProduct.image = productProps.image ?? oldProduct.image;
    oldProduct.price = productProps.price ?? oldProduct.price;
    oldProduct.color = productProps.color ?? oldProduct.color;

    await this.productRepo.save(oldProduct);

    return new ResProductDto(oldProduct);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const prod: ProductEntity | null = await this.productRepo.findOne({
      where: { id },
    });
    if (prod) {
      await this.productRepo.remove(prod);
      return true;
    } else {
      return false;
    }
  }

  async createProduct(props: TReqInsertProduct): Promise<ResProductDto> {
    const { color, description, image, name, price, stock } = props;

    const prod: ProductEntity = this.productRepo.create({
      id: ProductEntity.createProductId(),
      description,
      image,
      name,
      price,
      color,
    });

    await this.productRepo.save(prod);

    return new ResProductDto(prod);
  }
}
