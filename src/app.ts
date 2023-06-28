import "dotenv/config";
import express, { Express } from "express";
import { Server } from "http";
import TryCatch from "./utils/tryCatch.decorator";
import { PgClient } from "./database/dbClient";
import { IRoutes } from "./routers/routers.interface";
import { ExceptionFilter } from "./utils/errors/exceptionFilter";

@TryCatch
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    private readonly pgClient: PgClient,
    private readonly routers: IRoutes,
    private readonly exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = Number(process.env.PORT) || 5005;
  }

  private useMiddleware(): void {
    this.app.use(express.json({ limit: "1mb" }));
  }

  private useRoutes(): void {
    this.app.use("/", this.routers.usersRouter);
    this.app.use("/auth", this.routers.authRouter);
    this.app.use("/store_bucket", this.routers.storeRouter);
    this.app.use("/short", this.routers.shortLinkRouter);
  }

  private useExeptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();

    await this.pgClient.connectDbAndCreateTables();

    this.server = this.app.listen(this.port, () =>
      console.log(`Server started on PORT: ${this.port}...`)
    );
  }
}
