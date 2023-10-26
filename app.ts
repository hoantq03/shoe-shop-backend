import * as bodyParser from "body-parser";
import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { NotFoundError } from "./exceptions/not-found-error";
import { errorHandler } from "./middlewares/errors-handler";
import { productRoute } from "./routes/products";
import swaggerDocs from "./swagger";
import cors from "cors";

const app = express();

const port = parseInt(process.env.APP_PORT) || 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));

// handle routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello");
});

app.use("/api/v1", productRoute);

swaggerDocs(app, port);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Application running on port ", port);
});
