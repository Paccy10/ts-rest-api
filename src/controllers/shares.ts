import { NextFunction, Request, Response } from "express";
import { MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { Share } from "../entities/Share";
import { response } from "../utils/response";

const shareRepository = AppDataSource.getRepository(Share);

const getShares = async (type, order) => {
  return shareRepository.find({
    where: { type, quantity: MoreThan(0) },
    select: ["quantity", "price"],
    order: { price: order },
  });
};

const sell = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, price } = req.body;
  const share = await shareRepository.findOne({
    where: { type: "buy", price },
  });

  if (share) {
    const highestShare = await shareRepository.findOne({
      where: { type: "buy" },
      order: { price: "DESC" },
    });
    let remainder = 0;
    if (highestShare.quantity < quantity) {
      remainder = quantity - highestShare.quantity;
      highestShare.quantity = 0;
      share.quantity -= remainder;
    } else {
      highestShare.quantity -= quantity;
    }
    await shareRepository.save(share);
    const savedShare = await shareRepository.save(highestShare);
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
    const lowestShare = await shareRepository.findOne({
      where: { type: "sell" },
      order: { price: "ASC" },
    });
    let remainder = 0;
    if (lowestShare.quantity < quantity) {
      remainder = quantity - lowestShare.quantity;
      lowestShare.quantity = 0;
      share.quantity -= remainder;
    } else {
      lowestShare.quantity -= quantity;
    }
    await shareRepository.save(share);
    const savedShare = await shareRepository.save(lowestShare);
    return response({ res, code: 200, data: { share: savedShare } });
  }

  const newShare = shareRepository.create({ quantity, price, type: "buy" });
  const savedShare = await shareRepository.save(newShare);
  return response({ res, code: 201, data: { share: savedShare } });
};

const book = async (req: Request, res: Response, next: NextFunction) => {
  const buys = await getShares("buy", "DESC");
  const sells = await getShares("sell", "ASC");
  const data = { buys, sells };

  return response({ res, code: 200, data });
};

export default { sell, buy, book };
