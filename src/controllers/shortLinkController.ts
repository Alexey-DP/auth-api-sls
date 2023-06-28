import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TryCatch from "../utils/tryCatch.decorator";
import { IOriginalLinkReq } from "../interfaces/shortLink.interface";
import {
  ShortLinkService,
  shortLinkService,
} from "../services/shortLinkService";
import { HttpException } from "../utils/errors/httpException.class";
import { SuccessResDto } from "../dto/successResponseDto";
import { ErrorMessages } from "../constants/errorMesages.enum";

@TryCatch
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  async createShortLink(
    req: Request<any, any, IOriginalLinkReq>,
    res: Response
  ): Promise<void> {
    const { originalLink } = req.body;
    const isExistsShortLink = await this.shortLinkService.getLinkByOriginalLink(
      originalLink
    );
    let shortPath: string | null = null;

    if (isExistsShortLink) {
      shortPath = isExistsShortLink.short_path;
    }

    if (!isExistsShortLink) {
      shortPath = await this.shortLinkService.generateShortPath();
    }

    if (!shortPath) {
      throw new HttpException(
        "Can't create a short link, try again",
        StatusCodes.CONFLICT
      );
    }

    if (!isExistsShortLink) {
      await this.shortLinkService.saveShortLinkToDB({
        short_path: shortPath,
        original_link: originalLink,
      });
    }

    const newShortURL = this.shortLinkService.generateShortURL(req, shortPath);
    res
      .status(StatusCodes.CREATED)
      .json(new SuccessResDto({ shortLink: newShortURL }));
  }

  async goToOriginalLink(req: Request, res: Response): Promise<void> {
    const { link } = req.params;
    const existsLink = await this.shortLinkService.getLinkByShortPath(link);
    if (!existsLink) {
      throw HttpException.BadRequest(ErrorMessages.WrongShortLink);
    }
    res
      .status(StatusCodes.MOVED_PERMANENTLY)
      .redirect(existsLink.original_link);
  }
}

export const shortLinkController = new ShortLinkController(shortLinkService);
