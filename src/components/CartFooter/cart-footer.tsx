'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCart } from '@/context/cart-context';
import { useCartStorage } from '@/hooks';

import { Button } from '../Buttons';
import { ParagraphText } from '../Header';
import {
  StyledCartFooterWrapper,
  StyledMobileActions,
  StyledPaymentInfo,
} from './cart-footer.styles';

export function CartFooter() {
  const router = useRouter();
  const { getCartCount } = useCartStorage();
  const { cart } = useCart();

  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
    setTotalPrice(cart.reduce((sum, item) => sum + item.price, 0));
  }, [getCartCount, cart]);

  function alertMessage() {
    alert('Te gustaría trabajar conmigo? ... ¡Me encantaría!');
  }

  return (
    <StyledCartFooterWrapper>
      <Button
        variant="secondary"
        text="Continue shopping"
        className="desktop-only"
        onClick={() => router.push('/', { scroll: false })} // To opt out of Next.js scroll restoration, thanks to CSS position fixed... /sticky/ too but not in this case
      />

      {cartCount > 0 && (
        <StyledPaymentInfo>
          <ParagraphText className="total-price">
            <span>total </span>
            <span>{totalPrice} eur</span>
          </ParagraphText>
          <Button
            variant="primary"
            text="Pay"
            className="desktop-only"
            onClick={() => alertMessage()}
          />
        </StyledPaymentInfo>
      )}

      <StyledMobileActions>
        <Button
          variant="secondary"
          text="Continue shopping"
          onClick={() => router.push('/', { scroll: false })}
        />
        {cartCount > 0 && (
          <Button variant="primary" text="Pay" onClick={() => alertMessage()} />
        )}
      </StyledMobileActions>
    </StyledCartFooterWrapper>
  );
}
