import { IRoutes } from "./routers.interface";
import authRouter from "./authRouter";
import usersRouter from "./usersRouter";
import storeRouter from "./storeRouter";
import shortLinkRouter from "./shortLinkRouter";

const ROUTES: IRoutes = {
  authRouter,
  usersRouter,
  storeRouter,
  shortLinkRouter,
};

export default ROUTES;
