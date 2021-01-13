import { Request, Response } from 'express';
import { ProductModel } from '../models/product';

export const canIBuy = async (
  _: Request,
  res: Response<{ canIBuy: boolean }>
) => {
  const product = await ProductModel.findOne({ isAvailable: true });
  console.log(product?.isAvailable);
  if (product) res.json({ canIBuy: true });
  else res.json({ canIBuy: false });
};
