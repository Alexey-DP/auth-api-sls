import { Request, Response } from "express";
import { getClientIp } from "request-ip";
import { StatusCodes } from "http-status-codes";
import TryCatch from "../utils/tryCatch.decorator";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { SuccessResDto } from "../dto/successResponseDto";
import { IMyInfo } from "../interfaces/myInfo.interface";
import {
  CountryIpService,
  countryIpService,
} from "../services/countryIpService";

@TryCatch
export class UsersController {
  constructor(private readonly countryIpService: CountryIpService) {}

  async getMyInfo(req: CustomRequest, res: Response): Promise<void> {
    const { id, email } = req.user as IMyInfo;
    res.status(StatusCodes.OK).json(new SuccessResDto({ id, email }));
  }

  async getUsersCountryByIp(req: Request, res: Response): Promise<void> {
    const clientIp = getClientIp(req) || "";
    const usersIps = this.countryIpService.getFormatedIpsFromString(clientIp);
    let ip = "no data";
    let country = "no data";
    if (usersIps) {
      country = await this.countryIpService.getCountryByIpInt(usersIps.ipInt);
      ip = usersIps.ipString;
    }
    res.status(StatusCodes.OK).json(new SuccessResDto({ ip, country }));
  }
}

export const usersController = new UsersController(countryIpService);
