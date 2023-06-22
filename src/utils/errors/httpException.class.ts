import { StatusCodes } from "http-status-codes";
import { ErrorMessages } from "../../constants/errorMesages.enum";

export class HttpException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  static BadRequest(message: string) {
    return new HttpException(message, StatusCodes.BAD_REQUEST);
  }

  static UnauthorizedError() {
    return new HttpException(
      ErrorMessages.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED
    );
  }
}
