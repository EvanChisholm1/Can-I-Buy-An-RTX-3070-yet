import { Router, Request, Response } from 'express';
import { ProductModel, IProduct } from '../models/product';

const router = Router();

router.get(
  '/products',
  async (
    req: Request<any, any, any, { page?: string }>,
    res: Response<{ numberOfPages: number; products: IProduct[] }>
  ) => {
    let page: number | undefined;
    if (req.query.page) page = parseInt(req.query.page);
    const offsetBy = page ? (page - 1) * 10 : 0;

    const products = await ProductModel.find({}, null, {
      limit: 10,
      skip: offsetBy,
    });

    const numberOfPages = Math.ceil((await ProductModel.countDocuments()) / 10);

    console.log(products);
    res.json({
      numberOfPages,
      products,
    });
  }
);

export default router;
