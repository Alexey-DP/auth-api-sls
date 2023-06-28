import { IAuthRes } from "../interfaces/authRes.interface";
import { IMyInfo } from "../interfaces/myInfo.interface";
import { ICountryIp } from "../interfaces/ips.interface";
import { IShortLinkSuccess } from "../interfaces/shortLink.interface";

export class SuccessResDto {
  success = true;
  data: IAuthRes | IMyInfo | ICountryIp | IShortLinkSuccess;
  constructor(data: IAuthRes | IMyInfo | ICountryIp | IShortLinkSuccess) {
    this.data = data;
  }
}
