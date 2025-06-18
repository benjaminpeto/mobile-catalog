import { Suspense } from 'react';

import { AlertContainer, MobileListContainer } from '@/components';
import { SubHeading } from '@/components/Header';
import { SearchInput } from '@/components/SearchInput';
import { getProducts } from '@/services';

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;
  const products = await getProducts(search, 20, 0);

  return (
    <>
      <SearchInput initialValue={search} numberOfItems={products.length} />

      <Suspense
        fallback={
          <AlertContainer>
            <SubHeading $fontSize="24px">Loading products...</SubHeading>
          </AlertContainer>
        }
      >
        {products.length < 1 ? (
          <AlertContainer>
            <SubHeading $fontSize="24px">No products found</SubHeading>
          </AlertContainer>
        ) : (
          <MobileListContainer products={products} />
        )}
      </Suspense>
    </>
  );
}
