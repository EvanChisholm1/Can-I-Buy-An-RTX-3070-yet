import { Schema, model, Model, Document } from 'mongoose';
import { Product } from '../types/product';

export interface IProduct extends Product, Document {}

const productSchema = new Schema({
  name: String,
  url: String,
  store: String,
  isAvailable: Boolean,
  lastCheck: Date,
});

export const ProductModel: Model<IProduct> = model('Product', productSchema);
