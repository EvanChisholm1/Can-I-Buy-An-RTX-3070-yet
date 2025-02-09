import express, { json } from 'express';
import { schedule } from 'node-cron';
import { checkAvailibilty } from './checkAvailibility';
import { config } from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
import { ProductModel, IProduct } from './models/product';
import { discordClient } from './discordClient';
import Api from './api';
config();

const main = async () => {
  discordClient.login(process.env.DISCORD_TOKEN);

  await connect(process.env.CONNECTION_URL || 'mongodb://localhost/3070', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(Api);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));

  const products: IProduct[] = await ProductModel.find();

  await checkAvailibilty(products).catch(err => console.error(err));
  schedule('* * * * *', async () => {
    const newProducts = await ProductModel.find();
    await checkAvailibilty(newProducts);
  });
};

main().catch(err => console.error(err));
