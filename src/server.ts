import { App } from "./app";
import pgClient from "./database/dbClient";
import ROUTES from "./routers";
import exceptionFilter from "./utils/errors/exceptionFilter";

const startApp = async () => {
  const server = new App(pgClient, ROUTES, exceptionFilter);
  await server.init();
};

startApp();
