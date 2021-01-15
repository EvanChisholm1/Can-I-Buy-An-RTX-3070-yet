import { Router, Request, Response } from 'express';
import { ProductModel, IProduct } from '../models/product';

const router = Router();

// an endpoint for getting all the products
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
    // set the flag for if you want the availible products or not
    let onlyAvailible: boolean | undefined;
    if (req.query.onlyAvailible) onlyAvailible = true;

    // calculate the number of products to get and the offset based on the page number
    let page: number | undefined;
    if (req.query.page) page = parseInt(req.query.page);
    else page = 1;
    const offsetBy = (page - 1) * 10;

    // fetch the amount of products an pages in the db
    let products: IProduct[] | undefined;
    let numberOfPages: number | undefined;

    if (onlyAvailible) {
      products = await ProductModel.find({ isAvailable: true }, null, {
        limit: 10,
        skip: offsetBy,
      });
      numberOfPages = Math.ceil(
        (await ProductModel.countDocuments({ isAvailable: true })) / 10
      );
    } else {
      products = await ProductModel.find({}, null, {
        limit: 10,
        skip: offsetBy,
      });
      numberOfPages = Math.ceil((await ProductModel.countDocuments()) / 10);
    }

    // calculate the next page
    let nextPage: number | undefined;
    if (page + 1 <= numberOfPages) nextPage = page + 1;

    // console.log(products);
    res.json({
      numberOfPages,
      products,
      currentPage: page!,
      nextPage,
    });
  }
);

export default router;
