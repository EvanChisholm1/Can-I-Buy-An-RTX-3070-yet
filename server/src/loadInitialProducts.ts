import { products } from './products';
import { ProductModel } from './models/product';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

const main = async () => {
  connect(process.env.CONNECTION_URL || 'mongodb://localhost/3070', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  for (const product of products) {
    const doc = new ProductModel({ ...product, isAvailble: false });
    await doc.save();
  }
};

main()
  .catch(err => console.log(err))
  .finally(() => console.log('finished updating data'));
