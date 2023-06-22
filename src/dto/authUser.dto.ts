import { IUserInfo } from "../interfaces/user.interface";

export class AuthUserDto {
  email: string;
  password: string;
  constructor({ email, password }: IUserInfo) {
    this.email = email;
    this.password = password;
  }
}
