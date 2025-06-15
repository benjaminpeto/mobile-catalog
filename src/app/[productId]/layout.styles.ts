'use client';

import styled from 'styled-components';

export const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px 100px;

  @media (max-width: 768px) {
    padding: 24px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;
