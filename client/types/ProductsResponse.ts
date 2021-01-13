import { Product } from './product';

export interface ProductsResponse {
  products: Product[];
  numberOfPages: number;
  currentPage: number;
  nextPage?: number;
}
