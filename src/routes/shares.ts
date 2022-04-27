import express from "express";
import controller from "../controllers/shares";
import { asyncHandler } from "../middlewares/errorHandler";
import { validate } from "../middlewares/validate";
import { newShareValitors } from "../utils/validations/share";

const router = express.Router();

router.post("/sell", newShareValitors, validate, asyncHandler(controller.sell));
router.post("/buy", newShareValitors, validate, asyncHandler(controller.buy));
router.get("/book", asyncHandler(controller.book));

export = router;
