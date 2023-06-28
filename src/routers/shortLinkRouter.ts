import { Router } from "express";
import { shortLinkController } from "../controllers/shortLinkController";
import { validateReq } from "../middlewares/requestValidator.middleware";
import { shortLinkParams, shortLinkSchema } from "../schemas/shorlLinkSchema";

const shortLinkRouter = Router();

shortLinkRouter
  .post(
    "/",
    validateReq(shortLinkSchema),
    shortLinkController.createShortLink.bind(shortLinkController)
  )
  .get(
    "/:link",
    validateReq(shortLinkParams),
    shortLinkController.goToOriginalLink.bind(shortLinkController)
  );

export default shortLinkRouter;
