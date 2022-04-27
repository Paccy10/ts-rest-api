import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Share } from "../entities/Share";
import { response } from "../utils/response";

const shareRepository = AppDataSource.getRepository(Share);

const sell = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, price } = req.body;
  const share = await shareRepository.findOne({
    where: { type: "buy", price },
  });

  if (share) {
    share.quantity -= quantity;
    const savedShare = await shareRepository.save(share);
    return response({ res, code: 200, data: { share: savedShare } });
  }

  const newShare = shareRepository.create({ quantity, price, type: "sell" });
  const savedShare = await shareRepository.save(newShare);
  return response({ res, code: 201, data: { share: savedShare } });
};

const buy = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, price } = req.body;
  const share = await shareRepository.findOne({
    where: { type: "sell", price },
  });

  if (share) {
    share.quantity -= quantity;
    const savedShare = await shareRepository.save(share);
    return response({ res, code: 200, data: { share: savedShare } });
  }

  const newShare = shareRepository.create({ quantity, price, type: "buy" });
  const savedShare = await shareRepository.save(newShare);
  return response({ res, code: 201, data: { share: savedShare } });
};

const book = async (req: Request, res: Response, next: NextFunction) => {
  const buys = await shareRepository.find({
    where: { type: "buy" },
    select: ["quantity", "price"],
  });
  const sells = await shareRepository.find({
    where: { type: "sell" },
    select: ["quantity", "price"],
  });
  const data = { buys, sells };

  return response({ res, code: 200, data });
};

export default { sell, buy, book };
