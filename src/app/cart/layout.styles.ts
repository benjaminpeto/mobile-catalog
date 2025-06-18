'use client';

import styled from 'styled-components';

export const CartLayout = styled.main`
  height: calc(100dvh - 74px);
  width: 100%;
  padding: 48px 100px;
  border-top: 1px solid var(--foreground);

  & .cart-heading {
    padding: 12px 0px;
  }

  @media (max-width: 768px) {
    padding: 48px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;
