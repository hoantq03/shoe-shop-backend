import { Router } from "express";
import { ProductControllers } from "../controllers/product.controller";
import { validateRequest } from "../middlewares/validate-request";
import { body } from "express-validator";

export const productRoute = Router();

// NOTE: SWAGGER DOCUMENTS FOR API
/**
 * @openapi
 * '/localhost:3000/api/v1/products':
 *  get:
 *     tags:
 *     - Get All Products
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  image:
 *                    type: string
 *                  price:
 *                    type: number
 *                  color:
 *                    type: string
 *@openapi
 * '/localhost:3000/api/v1/products/{id}':
 *  get:
 *     tags:
 *     - Get One Product
 *     summary: Get Single Product
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the Product
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                price:
 *                  type: number
 *                color:
 *                  type: string
 *
 * @openapi
 * '/localhost:3000/api/v1/products':
 *  post:
 *     tags:
 *     - Add New Product
 *     summary: Add New Product
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *              - description
 *              - image
 *              - price
 *              - color
 *            properties:
 *              name:
 *                type: string
 *                default: Nike Zoom Fly 3 Premium
 *              description :
 *                type: string
 *                default : Inspired by the Vaporfly, the Nike Zoom Fly 3 Premium gives distance runners race-day comfort and durability. The power of a carbon fiber plate keeps you in the running mile after mile.
 *              image :
 *                type: string
 *                default: https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/zoom-fly-3-premium-mens-running-shoe-XhzpPH-removebg-preview.png
 *              price :
 *                type: number
 *                default: 160.0
 *              color :
 *                type: string
 *                default: #54D4C9
 *     responses:
 *      201:
 *        description: Created Succeed
 *      404:
 *        description: Not Found
 *      500:
 *        description: Something Error in Server
 *
 *  @openapi
 * '/localhost:3000/api/v1/products/{productId}':
 *  put:
 *     tags:
 *     - Update Product
 *     summary: Update Specific Product
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the Product
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: Nike Zoom Fly 3 Premium
 *              description :
 *                type: string
 *                default : Inspired by the Vaporfly, the Nike Zoom Fly 3 Premium gives distance runners race-day comfort and durability. The power of a carbon fiber plate keeps you in the running mile after mile.
 *              image :
 *                type: string
 *                default: https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/zoom-fly-3-premium-mens-running-shoe-XhzpPH-removebg-preview.png
 *              price :
 *                type: number
 *                default: 160.0
 *              color :
 *                type: string
 *                default: #54D4C9
 *     responses:
 *      201:
 *        description: Created Succeed
 *      404:
 *        description: Not Found
 *      500:
 *        description: Something Error in Server
 *
 *  @openapi
 * '/localhost:3000/api/v1/products/{id}':
 *  delete:
 *     tags:
 *     - Delete Specific Product
 *     summary: Remove Product by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the Product
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Something Error in Server
 */

productRoute.get("/products", ProductControllers.getAllProducts);

productRoute.get("/products/:id", ProductControllers.getProduct);

productRoute.post(
  "/products",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name of product can not be empty"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description of product can not be empty"),
    body("image").trim().isURL().withMessage("image must be valid"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  ProductControllers.createProduct
);

productRoute.put(
  "/products/:id",
  [
    body("name")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Name of product can not be empty"),
    body("description")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Description of product can not be empty"),
    body("image").trim().isURL().withMessage("image must be valid"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  ProductControllers.updateProduct
);

productRoute.delete("/products/:id", ProductControllers.deleteProduct);
