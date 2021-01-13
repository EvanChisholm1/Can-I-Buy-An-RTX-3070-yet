import { FC } from 'react';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="bg-gray-300 rounded-3xl p-7 grid grid-cols-1 divide-y-4 divide-black">
      {products.map(product => (
        <li key={product._id} className="p-4">
          <h2 className="text-3xl">
            {product.name} from {product.store}
          </h2>
          <a className="text-blue-800 underline" href={product.url}>
            {product.url}
          </a>
        </li>
      ))}
    </ul>
  );
};
