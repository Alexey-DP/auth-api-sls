import { IUserInfo, IUser } from "../interfaces/user.interface";
import PgClient from "../database/dbClient";

export class UserService {
  private readonly dbClient = PgClient.client;

  async getUserByEmail(email: string): Promise<IUser | null> {
    const { rows: users } = await this.dbClient.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return users[0] ? users[0] : null;
  }

  async createNewUser({ email, password }: IUserInfo): Promise<IUser> {
    const { rows: users } = await this.dbClient.query(
      "INSERT INTO users (email, password) values ($1, $2) RETURNING *",
      [email, password]
    );
    return users[0];
  }
}

export const userService = new UserService();
