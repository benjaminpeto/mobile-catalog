import { MobileListContainer, SearchInput } from '@/components';
import { getProducts } from '@/services';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <SearchInput />
      <MobileListContainer products={products} />
    </>
  );
}
