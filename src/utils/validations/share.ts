import { check } from "express-validator";

export const newShareValitors = [
  check("quantity", "quantity must be a positive integer")
    .trim()
    .isInt({ min: 1 }),
  check("price", "price must be a positive float number")
    .trim()
    .isFloat({ min: 0 }),
];
