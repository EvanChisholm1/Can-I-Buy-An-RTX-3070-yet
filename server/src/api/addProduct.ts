import { Request, Response } from 'express';
import { IProduct, ProductModel } from '../models/product';

export const addProduct = async (
  req: Request<any, IProduct, { name?: string; url?: string; store?: string }>,
  res: Response<IProduct | { error: string }>
) => {
  const { name, store, url } = req.body;
  if (!name) {
    res.json({ error: 'product name is required' });
  } else if (!store) {
    res.json({ error: 'product store is required' });
  } else if (!url) {
    res.json({ error: 'url is required' });
  }

  console.log('adding ', name);
  const product = new ProductModel({ name, store, url });
  await product.save();
  res.json(product);
};
