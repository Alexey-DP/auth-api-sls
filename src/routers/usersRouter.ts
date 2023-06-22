import { Router } from "express";
import { authMiddlewaer } from "../middlewares/auth.middleware";
import { usersController } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get(
  "/me",
  authMiddlewaer,
  usersController.getMyInfo.bind(usersController)
);

export default usersRouter;
