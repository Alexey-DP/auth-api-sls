import { Request, Response, NextFunction } from "express";
import TryCatch from "../utils/tryCatch.decorator";
import { HttpException } from "../utils/errors/httpException.class";
import { tokenService } from "../services/tokenService";
import { CustomRequest } from "../interfaces/customRequest.interface";

export const authMiddlewaer = TryCatch(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw HttpException.UnauthorizedError();

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) throw HttpException.UnauthorizedError();

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) throw HttpException.UnauthorizedError();

    req.user = userData;
    next();
  }
);
