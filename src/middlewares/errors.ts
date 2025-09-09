import { ErrorRequestHandler } from "express";
import { HTTPErrorCodes } from "../types";

export class BookstoreError extends Error {
  public code: number;

  constructor(code: HTTPErrorCodes, message: string) {
    super(message);
    this.code = code;
  }
}

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  if (err instanceof BookstoreError) {
    res.status(err.code).send({ message: err.message });
  } else {
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }

    res.status(HTTPErrorCodes.SERVER_ERROR).send({
      message: "Something unexpected happened.",
    });
  }
  next();
};
