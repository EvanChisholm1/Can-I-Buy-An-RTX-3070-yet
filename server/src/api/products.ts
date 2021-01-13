import { Router, Request, Response } from 'express';
import { ProductModel, IProduct } from '../models/product';

const router = Router();

router.get(
  '/products',
  async (
    req: Request<any, any, any, { page?: string; onlyAvailible?: string }>,
    res: Response<{
      numberOfPages: number;
      products: IProduct[];
      currentPage: number;
      nextPage: number | undefined;
    }>
  ) => {
    let onlyAvailible: boolean | undefined;
    if (req.query.onlyAvailible) onlyAvailible = true;

    let page: number | undefined;
    if (req.query.page) page = parseInt(req.query.page);
    else page = 1;
    const offsetBy = (page - 1) * 10;

    const products = await ProductModel.find({ onlyAvailible }, null, {
      limit: 10,
      skip: offsetBy,
    });

    const numberOfPages = Math.ceil((await ProductModel.countDocuments()) / 10);

    let nextPage: number | undefined;
    if (page + 1 <= numberOfPages) nextPage = page + 1;

    // console.log(products);
    console.log({
      numberOfPages,
      products,
      currentPage: page!,
      nextPage,
    });
    res.json({
      numberOfPages,
      products,
      currentPage: page!,
      nextPage,
    });
  }
);

export default router;
