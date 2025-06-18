'use client';

import { useEffect, useState } from 'react';

import { CartFooter, CartItem, MainHeading } from '@/components';
import { useCartStorage } from '@/hooks';

import { CartPageContainer } from './layout.styles';

export default function CartPage() {
  const { getCartCount } = useCartStorage();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  return (
    <CartPageContainer>
      <MainHeading className="cart-heading" suppressHydrationWarning>
        Cart({cartCount})
      </MainHeading>
      <div className="content">
        <CartItem />
      </div>
      <CartFooter />
    </CartPageContainer>
  );
}
