import { Router } from "express";
import { storeController } from "../controllers/storeController";

const storeRouter = Router();

storeRouter
  .put("/:link", storeController.putJsonData.bind(storeController))
  .get("/:link", storeController.getJsonData.bind(storeController));

export default storeRouter;
