import { CustomError } from "../@types/CustomError";

export const createError = (status: number, message: string) => {
  const err = new CustomError();
  err.status = status;
  err.message = message;
  return err;
};
