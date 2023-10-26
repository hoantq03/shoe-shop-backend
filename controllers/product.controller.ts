import { Request, Response } from "express";
import { ResProductDto } from "../service/dto/resProducts.dto";
import { ProductService } from "../service/product.service";
import { TReqInsertProduct, TReqUpdateProduct } from "../types/product.type";
import { HttpResponse } from "../utils/http-response";

const productServices = new ProductService();

export class ProductControllers {
  static async getAllProducts(req: Request, res: Response) {
    const data: ResProductDto[] = await productServices.getAllProducts();
    res.status(201).send(JSON.stringify(data));
  }

  static async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const data = await productServices.getProduct(id);
    res.status(201).send(JSON.stringify(data));
  }

  static async updateProduct(req: Request, res: Response) {
    const props: TReqUpdateProduct = req.body;
    const { id } = req.params;
    const result: ResProductDto = await productServices.updateProduct(
      props,
      id
    );
    res.status(result ? 200 : 400).send(
      JSON.stringify({
        message: result
          ? "updated product successfully"
          : "updated product failed",
        data: result,
      })
    );
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const result = await productServices.deleteProduct(id);
    res.status(result ? 200 : 400).send(
      JSON.stringify({
        message: result ? "deleted product succeed" : "deleted product failed",
      })
    );
  }
  static async createProduct(req: Request, res: Response) {
    const props: TReqInsertProduct = req.body;
    const result = await productServices.createProduct(props);
    res.status(result ? 201 : 400).send(
      JSON.stringify({
        message: result
          ? "inserted product succeed"
          : "inserted product failed",
        data: result,
      })
    );
  }
}
