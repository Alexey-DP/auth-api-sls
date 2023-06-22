import { Request, Response, NextFunction } from "express";
import { HttpException } from "./httpException.class";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ExceptionFilter {
  catch(
    err: Error | HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    const errMsg = {
      success: false,
      message: err.message,
    };
    if (err instanceof z.ZodError) {
      const validateMessage = err.issues.reduce(
        (prev: string[], curr) => [...prev, curr.message],
        []
      );
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ...errMsg, message: validateMessage });
    } else if (err instanceof HttpException) {
      res.status(err.statusCode).json(errMsg);
    } else {
      console.error(`${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errMsg);
    }
  }
}

export default new ExceptionFilter();
