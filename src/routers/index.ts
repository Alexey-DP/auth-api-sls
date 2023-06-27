import { IRoutes } from "./routers.interface";
import authRouter from "./authRouter";
import usersRouter from "./usersRouter";
import storeRouter from "./storeRouter";

const ROUTES: IRoutes = {
  authRouter,
  usersRouter,
  storeRouter,
};

export default ROUTES;
