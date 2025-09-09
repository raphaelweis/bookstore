import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { HTTPErrorCodes } from "../types";

export function requestValidator(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(HTTPErrorCodes.BAD_REQUEST).send({
          message: "Error, invalid request body format.",
          details: z.flattenError(e),
        });
      }
    }
  };
}
