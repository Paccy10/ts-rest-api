import { check } from "express-validator";

export const newShareValidators = [
  check("qty", "qty must be a positive integer").trim().isInt({ min: 1 }),
  check("prc", "prc must be a positive float number")
    .trim()
    .isFloat({ min: 0 }),
];
