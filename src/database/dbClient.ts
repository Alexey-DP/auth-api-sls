import { Client } from "pg";
import dbOptions from "../configs/pgConfig";
import TryCatch from "../utils/tryCatch.decorator";

@TryCatch
export class PgClient {
  client = new Client(dbOptions);

  async connectDbAndCreateTables() {
    await this.client.connect();

    await this.client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await this.client.query(`CREATE TABLE IF NOT EXISTS "users" (
                        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                        "email" VARCHAR(100) NOT NULL,
                        "password" VARCHAR(100) NOT NULL
                        );`);

    await this.client.query(`CREATE TABLE IF NOT EXISTS "store_bucket" (
                        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                        "link" VARCHAR(100) NOT NULL UNIQUE,
                        "part_first" TEXT,
                        "part_last" TEXT
                        );`);

    await this.client.query(`CREATE TABLE IF NOT EXISTS "short_links" (
                        "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                        "short_path" VARCHAR(100) NOT NULL UNIQUE,
                        "original_link" TEXT NOT NULL
                        );`);
  }
}

export default new PgClient();
