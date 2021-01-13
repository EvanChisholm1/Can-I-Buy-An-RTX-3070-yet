import { FC, useEffect, useState } from 'react';
import { ProductList } from './ProductList';
import { usePaginatedProducts } from '../hooks/usePaginatedProducts';
import { ProductsResponse } from '../types/ProductsResponse';

interface Props {
  initialData?: ProductsResponse;
}

export const ProductListContainer: FC<Props> = ({ initialData }) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = usePaginatedProducts({
    initialData,
  });
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    if (data.pages) {
      const products = data.pages.flatMap(page => page.products);
      setAllProducts(products);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  else
    return (
      <div>
        <ProductList products={allProducts} />
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </div>
    );
};
