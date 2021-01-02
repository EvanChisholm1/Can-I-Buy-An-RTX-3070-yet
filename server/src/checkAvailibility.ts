import { isBestBuyAvailable } from './handlers/bestbuy';
import { isNewEggAvailable } from './handlers/newegg';
import { Product } from './types/product';
import { launch } from 'puppeteer';

export const checkAvailibilty = async (products: Product[]) => {
  console.log('starting check');
  const browser = await launch({ headless: false, timeout: 0 });
  const page = await browser.newPage();
  for (const product of products) {
    switch (product.store) {
      case 'bestbuy':
        await isBestBuyAvailable(product, page);
        break;
      case 'newegg':
        await isNewEggAvailable(product, page);
        break;
      default:
        break;
    }
  }
  await browser.close();
  console.log('end of check \r\n');
};
