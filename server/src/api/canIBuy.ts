import { Request, Response } from 'express';
import { ProductModel } from '../models/product';

// an endpoint for finding if you can order the RTX 3070
export const canIBuy = async (
  _: Request,
  res: Response<{ canIBuy: boolean }>
) => {
  const product = await ProductModel.findOne({ isAvailable: true });

  if (product) res.json({ canIBuy: true });
  else res.json({ canIBuy: false });
};
