import { Button } from '../Buttons';
import { ParagraphText } from '../Header';
import {
  StyledCartFooterWrapper,
  StyledMobileActions,
  StyledPaymentInfo,
} from './cart-footer.styles';

export function CartFooter() {
  return (
    <StyledCartFooterWrapper>
      {/*
        Desktop only secondary button
      */}
      <Button
        variant="secondary"
        text="Continue shopping"
        className="desktop-only"
      />

      {/*
        Desktop only payment‐info
      */}
      <StyledPaymentInfo>
        <ParagraphText className="total-price">Total –price– EUR</ParagraphText>
        <Button variant="primary" text="Pay" className="desktop-only" />
      </StyledPaymentInfo>

      {/*
        Mobile only row of buttons
      */}
      <StyledMobileActions>
        <Button variant="secondary" text="Continue shopping" />
        <Button variant="primary" text="Pay" />
      </StyledMobileActions>
    </StyledCartFooterWrapper>
  );
}
