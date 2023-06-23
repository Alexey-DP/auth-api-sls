import { IAuthRes } from "../interfaces/authRes.interface";
import { IMyInfo } from "../interfaces/myInfo.interface";
import { ICountryIp } from "../interfaces/ips.interface";

export class SuccessResDto {
  success = true;
  data: IAuthRes | IMyInfo | ICountryIp;
  constructor(data: IAuthRes | IMyInfo | ICountryIp) {
    this.data = data;
  }
}
