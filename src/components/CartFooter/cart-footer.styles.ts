'use client';

import styled from 'styled-components';

export const StyledCartFooterWrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 100px;
  background-color: var(--background);

  .desktop-only {
    display: inline-flex;
  }

  & button {
    max-width: 220px;
  }

  @media (max-width: 768px) {
    padding: 16px 40px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    .desktop-only {
      display: none;
    }
  }
  @media (max-width: 480px) {
    padding: 16px 16px;
  }
`;

export const StyledPaymentInfo = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;

  & .total-price {
    margin-right: 40px;
    font-weight: 400;
  }

  @media (max-width: 600px) {
    justify-content: space-between;
    width: 100%;

    & .total-price {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 24px;
      text-align: center;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const StyledMobileActions = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
  }
`;
