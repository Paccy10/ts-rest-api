import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";

export const asyncHandler = (func) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      response({ res, code: 500, errors: [{ msg: error.message }] });
    }
  };
};
