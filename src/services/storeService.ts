import PgClient from "../database/dbClient";
import {
  IStoreDataDb,
  IStoreDataFromUser,
} from "../interfaces/storeData.interface";

export class StoreService {
  private readonly dbClient = PgClient.client;

  async putDataToStore({
    link,
    data,
  }: IStoreDataFromUser): Promise<IStoreDataDb> {
    const strMiddle = Math.floor(data.length / 2);
    const partFirst = data.slice(0, strMiddle);
    const partLast = data.slice(strMiddle);
    const { rows } = await this.dbClient.query(
      `INSERT INTO store_bucket (link, part_first, part_last)
      VALUES ($1, $2, $3)
      ON CONFLICT (link)
      DO UPDATE SET part_first = $2, part_last = $3 RETURNING *`,
      [link, partFirst, partLast]
    );
    return rows[0];
  }

  async getDataByLink(link: string): Promise<IStoreDataDb | null> {
    const { rows: data } = await this.dbClient.query(
      "SELECT * FROM store_bucket WHERE link = $1",
      [link]
    );
    return data[0] ? data[0] : null;
  }
}

export const storeService = new StoreService();
