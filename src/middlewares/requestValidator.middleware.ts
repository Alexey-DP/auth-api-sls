import { Request, Response, NextFunction } from "express";
import TryCatch from "../utils/tryCatch.decorator";
import { AnyZodObject } from "zod";

export const validateReq = (schema: AnyZodObject) =>
  TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  });
