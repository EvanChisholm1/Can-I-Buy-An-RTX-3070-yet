import { Page } from 'puppeteer';
import { Product } from '../types/product';

export const newEggHandler = async ({ url, name }: Product, page: Page) => {
  await page.goto(url);
  const productBuy = await page.$('#ProductBuy');
  const innerHTML = await productBuy?.evaluate(el => {
    return el.innerHTML;
  });

  if (innerHTML?.includes('Sold Out')) console.log(`${name} is sold out`);
  else console.log(`${name} is available`);
};
