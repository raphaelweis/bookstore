import { ErrorRequestHandler } from "express";
import { ErrorCodes } from "./types";

export class BookstoreError extends Error {
  public code: number;

  constructor(code: ErrorCodes, message?: string) {
    super(message);
    this.code = code;
  }
}

export const defaultErrorHandler: ErrorRequestHandler = (
  err: BookstoreError,
  _req,
  res,
  _next,
) => {
  res
    .status(err.code)
    .send({
      message: err.message ? err.message : "Something unexpected happened.",
    });
};
