import { isBestBuyAvailable } from './handlers/bestbuy';
import { isNewEggAvailable } from './handlers/newegg';
import { launch } from 'puppeteer';
import { IProduct } from './models/product';
import { discordClient } from './discordClient';
import { TextChannel } from 'discord.js';

export const checkAvailibilty = async (products: IProduct[]) => {
  console.log('starting check');

  const browser = await launch({ headless: false, timeout: 0 });
  const page = await browser.newPage();

  for (const product of products) {
    const wasAvailible = product.isAvailable;
    let isAvailable: boolean = false;
    switch (product.store) {
      case 'bestbuy':
        isAvailable = await isBestBuyAvailable(product, page);
        break;
      case 'newegg':
        isAvailable = await isNewEggAvailable(product, page);
        break;
      default:
        break;
    }

    product.isAvailable = isAvailable;
    product.lastCheck = new Date();
    product.save();
    if (isAvailable !== wasAvailible) {
      const channel = await discordClient.channels.fetch('795000612751671317');
      if (channel.type === 'text') {
        (channel as TextChannel).send(
          `@everyone ${product.name} from ${product.store} is availble here: ${product.url}`
        );
      }
    }
  }
  await browser.close();
  console.log('end of check \r\n');
};
