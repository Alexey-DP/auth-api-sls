import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TryCatch from "../utils/tryCatch.decorator";
import { StoreService, storeService } from "../services/storeService";
import { HttpException } from "../utils/errors/httpException.class";

@TryCatch
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  async putJsonData(req: Request, res: Response): Promise<void> {
    const dataToPut = {
      link: req.params.link,
      data: JSON.stringify(req.body),
    };
    const savedData = await storeService.putDataToStore(dataToPut);
    res
      .status(StatusCodes.CREATED)
      .json(JSON.parse(savedData.part_first + savedData.part_last));
  }

  async getJsonData(req: Request, res: Response): Promise<void> {
    const { link } = req.params;
    const data = await this.storeService.getDataByLink(link);
    if (!data) {
      throw new HttpException(
        "Check your link and try again",
        StatusCodes.NOT_FOUND
      );
    }
    res
      .status(StatusCodes.OK)
      .json(JSON.parse(data.part_first + data.part_last));
  }
}

export const storeController = new StoreController(storeService);
