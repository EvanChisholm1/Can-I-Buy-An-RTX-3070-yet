import express from 'express';
import { schedule } from 'node-cron';
import { products } from './products';
import { checkAvailibilty } from './checkAvailibility';
import { config } from 'dotenv';
import cors from 'cors';
config();

// const wait = (t: number) => new Promise(resolve => setTimeout(resolve, t));

const main = async () => {
  const app = express();

  app.use(cors());

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));

  await checkAvailibilty(products).catch(err => console.error(err));
  schedule('* * * * *', async () => await checkAvailibilty(products));
};

main().catch(err => console.error(err));
