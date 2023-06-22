import { IAuthRes } from "../interfaces/authRes.interface";
import { IAccessRefreshTokens } from "../interfaces/accessRefreshTokens.interface";
import { IUser } from "../interfaces/user.interface";
import { IMyInfo } from "../interfaces/myInfo.interface";

export class SuccessResDto {
  success: boolean;
  data: IAuthRes | IMyInfo;
  constructor(data: IAuthRes | IMyInfo) {
    this.success = true;
    this.data = data;
  }
}
