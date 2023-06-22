import { IRoutes } from "./routers.interface";
import authRouter from "./authRouter";
import usersRouter from "./usersRouter";

const ROUTES: IRoutes = {
  authRouter,
  usersRouter,
};

export default ROUTES;
