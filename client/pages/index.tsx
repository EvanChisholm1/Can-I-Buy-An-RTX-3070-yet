import { GetServerSideProps } from 'next/types';
import { API_URL } from '../constants';
import { IsAvailible } from '../components/isAvailible';
import { Product } from '../types/product';
import { ProductListContainer } from '../components/ProductListContainer';
import { useCanIBuy } from '../hooks/useCanIBuy';

export const getServerSideProps: GetServerSideProps = async () => {
  const canIBuyPromise = fetch(`${API_URL}/canibuy`);
  const productsPromsie = fetch(`${API_URL}/products`);
  const [canIBuyRes, productsRes] = await Promise.all([
    canIBuyPromise,
    productsPromsie,
  ]);
  const { canIBuy }: { canIBuy: boolean } = await canIBuyRes.json();
  const {
    numberOfPages,
    products,
  }: { numberOfPages: number; products: Product[] } = await productsRes.json();
  console.log(canIBuy);

  return {
    props: { numberOfPages, products, canIBuy },
  };
};

export default function Home({ canIBuy, products }) {
  const {
    data: { canIBuy: isAvailible },
  } = useCanIBuy({ initialData: { canIBuy } });

  return (
    <div>
      <div className="grid items-center h-94 mt-14">
        <IsAvailible name="RTX 3070" isAvailible={isAvailible} />
      </div>
      {canIBuy && (
        <div className="container mx-auto px-5 py-5">
          <ProductListContainer initialData={products} />
        </div>
      )}
    </div>
  );
}
