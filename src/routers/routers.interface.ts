import { Router } from "express";

export interface IRoutes {
  authRouter: Router;
  usersRouter: Router;
  storeRouter: Router;
  shortLinkRouter: Router;
}
