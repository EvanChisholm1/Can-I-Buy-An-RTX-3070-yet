import { launch } from 'puppeteer';
import { newEggHandler } from './handlers/newegg';
import { schedule } from 'node-cron';
import { products } from './products';

// const wait = (t: number) => new Promise(resolve => setTimeout(resolve, t));

const main = async () => {
  console.log('running browser');
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  for (const product of products) {
    await newEggHandler(product, page).catch(err => console.error(err));
  }
  await browser.close();
};

schedule('* * * * *', main);

main().catch(err => console.error(err));
