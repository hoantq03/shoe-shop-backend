import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShoesShop API",
      description: "This is docs for ShoesShop API",
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: ["./routes/*{.ts,.js}"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: any, port: number = 3000) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });
}

export default swaggerDocs;
