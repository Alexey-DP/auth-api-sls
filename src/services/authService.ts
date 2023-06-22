import { hash, compare } from "bcrypt";

export class AuthService {
  private readonly salt = 7;

  async hashUsersPassword(password: string): Promise<string> {
    return await hash(password, this.salt);
  }

  async checkPasswords(
    currentPassword: string,
    usersPassword: string
  ): Promise<boolean> {
    return await compare(currentPassword, usersPassword);
  }
}

export const authService = new AuthService();
