import { GetServerSideProps } from 'next/types';
import { API_URL } from '../constants';
import { IsAvailible } from '../components/isAvailible';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}/canibuy`);
  const { canIBuy }: { canIBuy: boolean } = await res.json();
  console.log(canIBuy);

  return {
    props: { canIBuy },
  };
};

export default function Home({ canIBuy }) {
  return (
    <div>
      <IsAvailible name="RTX 3070" isAvailible={canIBuy} />
    </div>
  );
}
