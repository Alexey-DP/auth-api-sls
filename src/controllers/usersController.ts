import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import TryCatch from "../utils/tryCatch.decorator";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { SuccessResDto } from "../dto/successResponseDto";
import { IMyInfo } from "../interfaces/myInfo.interface";

@TryCatch
export class UsersController {
  async getMyInfo(req: CustomRequest, res: Response): Promise<void> {
    const { id, email } = req.user as IMyInfo;
    res.status(StatusCodes.OK).json(new SuccessResDto({ id, email }));
  }
}

export const usersController = new UsersController();
