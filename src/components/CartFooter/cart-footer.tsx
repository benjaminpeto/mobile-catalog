'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { useCart } from '@/context/cart-context';

import { Button } from '../Buttons';
import { ParagraphText } from '../Header';
import {
  StyledCartFooterWrapper,
  StyledMobileActions,
  StyledPaymentInfo,
} from './cart-footer.styles';

export function CartFooter() {
  const router = useRouter();
  const { cart } = useCart();

  const cartCount = cart.length;
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart],
  );

  function alertMessage() {
    alert('Te gustaría trabajar conmigo? ... ¡Me encantaría!');
  }

  return (
    <StyledCartFooterWrapper>
      <Button
        variant="secondary"
        text="Continue shopping"
        className="desktop-only"
        onClick={() => router.push('/', { scroll: false })}
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
            onClick={alertMessage}
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
          <Button variant="primary" text="Pay" onClick={alertMessage} />
        )}
      </StyledMobileActions>
    </StyledCartFooterWrapper>
  );
}
