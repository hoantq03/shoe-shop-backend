import { CustomError } from "./custom-errors";

export class ServerError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Something Wrong with the server");

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: "Something wrong with the server" }];
  }
}
