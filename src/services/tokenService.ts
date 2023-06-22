import jwt from "jsonwebtoken";
import { IAccessRefreshTokens } from "../interfaces/accessRefreshTokens.interface";
import { ITokenPayload } from "../interfaces/tokenPayload.interface";
import { IUser } from "../interfaces/user.interface";

export class TokenService {
  generateTokens({ id, email }: IUser): IAccessRefreshTokens {
    const accessToken = jwt.sign(
      { id, email },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: `${process.env.JWT_ACCESS_TTL}m`,
      }
    );
    const refreshToken = jwt.sign(
      { id, email },
      process.env.JWT_REFRESH_SECRET as string
    );
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): ITokenPayload | null {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string
      );
      return userData as ITokenPayload;
    } catch (error) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
