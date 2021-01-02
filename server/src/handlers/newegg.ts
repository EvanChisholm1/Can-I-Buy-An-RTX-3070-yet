import { Page } from 'puppeteer';
import { Product } from '../types/product';

export const isNewEggAvailable = async (
  { url, name }: Product,
  page: Page
): Promise<boolean> => {
  await page.goto(url);
  const productBuy = await page.$('#ProductBuy');
  const innerHTML = await productBuy?.evaluate(el => {
    return el.innerHTML;
  });

  if (innerHTML?.includes('Sold Out')) {
    console.log(`${name} is sold out`);
    return false;
  } else {
    console.log(`${name} is available`);
    return true;
  }
};
