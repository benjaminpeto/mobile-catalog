'use client';

import { useCart } from '@/context';

import { BasketContainer, BasketSVG } from './basket.styles';

export function Basket() {
  const { cart } = useCart();

  return (
    <BasketContainer href="/cart">
      <BasketSVG src="/basket.svg" alt="basket svg" width={12.24} height={16} />
      <span suppressHydrationWarning>{cart.length}</span>{' '}
      {/* can't opt into <NoSSR> because of the nature of the "component" which is an element -- suppressHydrationWarning only works a level deep */}
    </BasketContainer>
  );
}
