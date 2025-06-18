'use client';

import styled from 'styled-components';

export const StyledCartFooterWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 56px;
  position: relative;

  .desktop-only {
    display: inline-flex;
  }

  & button {
    max-width: 250px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 32px;
    justify-content: center;

    .desktop-only {
      display: none;
    }
  }
`;

export const StyledPaymentInfo = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  & .total-price {
    margin-top: 41px;
    margin-right: 40px;
    font-weight: 400;
  }

  @media (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
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
