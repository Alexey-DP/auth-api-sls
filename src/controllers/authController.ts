import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TryCatch from "../utils/tryCatch.decorator";
import { AuthUserDto } from "../dto/authUser.dto";
import { UserService, userService } from "../services/userService";
import { HttpException } from "../utils/errors/httpException.class";
import { IUserInfo } from "../interfaces/user.interface";
import { AuthService, authService } from "../services/authService";
import { TokenService, tokenService } from "../services/tokenService";
import { SuccessResDto } from "../dto/successResponseDto";
import { ErrorMessages } from "../constants/errorMesages.enum";

@TryCatch
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(
    req: Request<any, any, IUserInfo>,
    res: Response
  ): Promise<void> {
    const { email, password } = new AuthUserDto(req.body);
    const existedUser = await this.userService.getUserByEmail(email);
    if (existedUser) {
      throw new HttpException("Email already exists", StatusCodes.CONFLICT);
    }
    const hashPassword = await this.authService.hashUsersPassword(password);
    const newUser = await this.userService.createNewUser({
      email,
      password: hashPassword,
    });
    const tokens = this.tokenService.generateTokens(newUser);
    res
      .status(StatusCodes.CREATED)
      .json(new SuccessResDto({ id: newUser.id, ...tokens }));
  }

  async signIn(
    req: Request<any, any, IUserInfo>,
    res: Response
  ): Promise<void> {
    const { email, password } = new AuthUserDto(req.body);
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw HttpException.BadRequest(ErrorMessages.WrongEmailOrPassword);
    }
    const isPasswordEquals = await this.authService.checkPasswords(
      password,
      user.password
    );
    if (!isPasswordEquals) {
      throw HttpException.BadRequest(ErrorMessages.WrongEmailOrPassword);
    }
    const tokens = this.tokenService.generateTokens(user);
    res
      .status(StatusCodes.OK)
      .json(new SuccessResDto({ id: user.id, ...tokens }));
  }
}

export const authController = new AuthController(
  userService,
  authService,
  tokenService
);
