import { Request, Response } from "express";
import { nanoid } from "nanoid";
import PgClient from "../database/dbClient";
import { IShortLinkDb } from "../interfaces/shortLink.interface";

export class ShortLinkService {
  private readonly dbClient = PgClient.client;

  async generateShortPath(pathLength = 5): Promise<string | null> {
    if (pathLength > 10) {
      return null;
    }
    const shortPath = nanoid(pathLength);
    const isExistsPath = await this.getLinkByShortPath(shortPath);

    if (isExistsPath) {
      return await this.generateShortPath(++pathLength);
    }

    return shortPath;
  }

  generateShortURL(req: Request, shortPath: string): string {
    return (
      req.protocol + "://" + req.get("host") + req.originalUrl + "/" + shortPath
    );
  }

  async getLinkByShortPath(shortPath: string): Promise<IShortLinkDb | null> {
    const { rows: path } = await this.dbClient.query(
      "SELECT * FROM short_links WHERE short_path = $1",
      [shortPath]
    );
    return path[0] ? path[0] : null;
  }

  async getLinkByOriginalLink(
    originalLink: string
  ): Promise<IShortLinkDb | null> {
    const { rows: link } = await this.dbClient.query(
      "SELECT * FROM short_links WHERE original_link = $1",
      [originalLink]
    );
    return link[0] ? link[0] : null;
  }

  async saveShortLinkToDB({
    short_path,
    original_link,
  }: IShortLinkDb): Promise<IShortLinkDb> {
    const { rows: link } = await this.dbClient.query(
      "INSERT INTO short_links (short_path, original_link) values ($1, $2) RETURNING *",
      [short_path, original_link]
    );
    return link[0];
  }
}

export const shortLinkService = new ShortLinkService();
