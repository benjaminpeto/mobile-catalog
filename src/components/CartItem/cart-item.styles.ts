'use client';

import Image from 'next/image';
import { styled } from 'styled-components';

export const StyledCartItem = styled.article`
  flex: 1;
  overflow-y: auto;
  padding-top: 48px;
  gap: 80px;

  @media (max-width: 600px) {
    padding-top: 24px;
  }
`;

export const StyledCartItemWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const StyledCartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledCartItemImage = styled(Image)`
  object-fit: contain;
  width: 262px;
  height: 324px;
`;
