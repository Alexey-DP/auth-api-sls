import { IAccessRefreshTokens } from "./accessRefreshTokens.interface";

export interface IAuthRes extends IAccessRefreshTokens {
  id: string;
}
