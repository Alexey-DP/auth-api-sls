import { Request } from "express";
import { IMyInfo } from "./myInfo.interface";

export interface CustomRequest extends Request {
  user?: IMyInfo;
}
