import { useInfiniteQuery } from 'react-query';
import { API_URL } from '../constants';
import { ProductsResponse } from '../types/ProductsResponse';

export const usePaginatedProducts = ({ initialData }) => {
  const fetchProducts = async ({
    pageParam = 1,
  }): Promise<ProductsResponse> => {
    const req = await fetch(
      `${API_URL}/products?page=${pageParam}&onlyAvailible=true`,
      {
        headers: { 'Content-Type': 'Application/json' },
      }
    );

    if (!req.ok) throw new Error(`Error request failed`);

    return req.json();
  };

  const queryObject = useInfiniteQuery<ProductsResponse, any>(
    'products',
    fetchProducts,
    {
      getNextPageParam: lastPage => lastPage.nextPage,
      initialData,
    }
  );

  return queryObject;
};
