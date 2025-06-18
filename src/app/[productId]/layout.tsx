import type { Metadata } from 'next';

import { BackButton } from '@/components';

import { BackButtonContainer, ProductPageContainer } from './layout.styles';

// TODO - add metadata for SEO dynamically based on product
export const metadata: Metadata = {
  title: 'Mobile Catalog',
  description: 'A catalog of mobile devices',
};

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackButtonContainer>
        <BackButton />
      </BackButtonContainer>
      <ProductPageContainer>{children}</ProductPageContainer>
    </>
  );
}
