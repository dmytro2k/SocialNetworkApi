import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

export default class UnauthenticatedError extends CustomError{
  statusCode: StatusCodes

  constructor(message: string){
    super(message, StatusCodes.UNAUTHORIZED)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}