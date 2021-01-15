import { FC, useEffect, useState } from 'react';
import { Button } from './button';
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
    console.log(data);
    if (data.pages) {
      const products = data.pages.flatMap(page => page.products);
      setAllProducts(products);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  else
    return (
      <div className="flex flex-col items-center gap-3">
        <ProductList products={allProducts} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        )}
      </div>
    );
};
