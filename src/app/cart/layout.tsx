import type { Metadata } from 'next';

import { CartLayout } from './layout.styles';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping basket',
};

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CartLayout>{children}</CartLayout>;
}
