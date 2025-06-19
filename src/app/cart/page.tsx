'use client';

import { CartFooter, CartItem, MainHeading } from '@/components';
import { useCart } from '@/context';

import { CartPageContainer } from './layout.styles';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <CartPageContainer>
      <MainHeading className="cart-heading" suppressHydrationWarning>
        Cart({cart.length})
      </MainHeading>
      <div className="content">
        <CartItem />
      </div>
      <CartFooter />
    </CartPageContainer>
  );
}
