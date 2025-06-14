import type { Metadata } from 'next';

import StyledComponentsRegistry from '@/lib/registry';

import { GlobalStyles } from './globals.styles';

export const metadata: Metadata = {
  title: 'Mobile Catalog',
  description: 'A catalog of mobile devices',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
