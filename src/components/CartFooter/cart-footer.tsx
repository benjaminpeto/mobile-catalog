'use client';

import { useRouter } from 'next/navigation';

import { Button } from '../Buttons';
import { ParagraphText } from '../Header';
import {
  StyledCartFooterWrapper,
  StyledMobileActions,
  StyledPaymentInfo,
} from './cart-footer.styles';

export function CartFooter() {
  const router = useRouter();

  return (
    <StyledCartFooterWrapper>
      <Button
        variant="secondary"
        text="Continue shopping"
        className="desktop-only"
        onClick={() => router.push('/')}
      />

      <StyledPaymentInfo>
        <ParagraphText className="total-price">
          <span>total </span>
          <span>[price] eur</span>
        </ParagraphText>
        <Button variant="primary" text="Pay" className="desktop-only" />
      </StyledPaymentInfo>

      <StyledMobileActions>
        <Button variant="secondary" text="Continue shopping" />
        <Button variant="primary" text="Pay" />
      </StyledMobileActions>
    </StyledCartFooterWrapper>
  );
}
