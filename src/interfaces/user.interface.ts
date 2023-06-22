export interface IUserInfo {
  email: string;
  password: string;
}

export interface IUser extends IUserInfo {
  id: string;
}
