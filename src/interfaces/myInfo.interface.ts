import { IUser } from "./user.interface";

export type IMyInfo = Omit<IUser, "password">;
