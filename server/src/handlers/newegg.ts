import { Page } from 'puppeteer';
import { Product } from '../types/product';

export const isNewEggAvailable = async (
  { url, name }: Product,
  page: Page
): Promise<boolean> => {
  await page.goto(url);
  const body = await page.$('body');
  const innerHTML = await body?.evaluate(el => {
    return el.innerHTML;
  });

  if (
    innerHTML?.toLowerCase().includes('sold out') ||
    innerHTML?.toLowerCase().includes('out of stock')
  ) {
    console.log(`${name} is sold out`);
    return false;
  } else {
    console.log(`${name} is available`);
    return true;
  }
};
