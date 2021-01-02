import { Page } from 'puppeteer';
import { Product } from '../types/product';

export const isBestBuyAvailable = async (
  { url, name }: Product,
  page: Page
): Promise<boolean> => {
  await page.goto(url);
  let isAvailable = true;
  const buyButtons = await page.$$('.add-to-cart-button');
  for (const button of buyButtons) {
    const innerHTML = await button.evaluate(el => {
      return el.innerHTML;
    });

    if (innerHTML.includes('Sold Out')) {
      isAvailable = false;
    }
  }
  if (isAvailable) console.log(`${name} is available`);
  else console.log(`${name} is sold out`);
  return isAvailable;
};
