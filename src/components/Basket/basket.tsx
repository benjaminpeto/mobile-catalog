'use client';

import { useEffect, useState } from 'react';

import { useCartStorage } from '@/hooks/use-cart-storage';

import { BasketContainer, BasketSVG } from './basket.styles';

export function Basket() {
  const { getCartCount } = useCartStorage();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  return (
    <BasketContainer href="/cart">
      <BasketSVG src="/basket.svg" alt="basket svg" width={12.24} height={16} />
      <span suppressHydrationWarning>{cartCount}</span>{' '}
      {/* can't opt into <NoSSR> because of the nature of the "component" which is an element -- suppressHydrationWarning only works a level deep */}
    </BasketContainer>
  );
}
