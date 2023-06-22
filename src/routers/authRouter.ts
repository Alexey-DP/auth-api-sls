import { Router } from "express";
import { validateReq } from "../middlewares/requestValidator.middleware";
import { authController } from "../controllers/authController";
import { authSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter
  .post(
    "/sign-up",
    validateReq(authSchema),
    authController.signUp.bind(authController)
  )
  .post(
    "/sign-in",
    validateReq(authSchema),
    authController.signIn.bind(authController)
  );

export default authRouter;
