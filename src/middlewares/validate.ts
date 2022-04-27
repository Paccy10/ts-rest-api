import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response({ res, code: 400, errors: errors.array() });
  }
  next();
};
