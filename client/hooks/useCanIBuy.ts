import { useQuery, UseQueryOptions, QueryObserverResult } from 'react-query';
import { API_URL } from '../constants';
import { CanIBuyResponse } from '../types/CanIBuyResponse';

const fetchCanIBuy = async (): Promise<CanIBuyResponse> => {
  const res = await fetch(`${API_URL}/canibuy`);
  const data: CanIBuyResponse = await res.json();
  return data;
};

export const useCanIBuy = (
  options?: UseQueryOptions<CanIBuyResponse>
): QueryObserverResult<CanIBuyResponse> => {
  const queryObject = useQuery<CanIBuyResponse>('isAvailible', fetchCanIBuy, {
    ...options,
    refetchInterval: 60 * 1000,
  });
  return queryObject;
};
