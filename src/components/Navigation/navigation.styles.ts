'use client';

import Image from 'next/image';
import { styled } from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 100px;
  max-height: 80px;

  @media (max-width: 768px) {
    padding: 24px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const Logo = styled(Image)`
  width: 74px;
  height: 24px;
  cursor: pointer;
`;
