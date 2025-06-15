'use client';

import styled from 'styled-components';

export const AlertContainerWrapper = styled.div`
  position: flex;
  padding: 24px 100px;

  @media (max-width: 768px) {
    padding: 24px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;
