'use client';

import styled from 'styled-components';

export const CartLayout = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 75.5px);
  overflow: hidden; /* Prevent multiple scrollbars */
  border-top: 1px solid var(--foreground); /* Ensure top border is visible */
  padding: 48px 100px; /* Adjusted padding for larger screens */

  & .content {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  & .content::-webkit-scrollbar {
    display: none;
  }

  & .cart-heading {
    padding: 12px 0px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    padding: 48px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;

  & .content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 100px;
  }

  & .cart-heading {
    margin-bottom: 100px;
  }
`;
