'use client';

import Image from 'next/image';
import Link from 'next/link';
import { styled } from 'styled-components';

export const BasketContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0px;
  cursor: pointer;
`;

export const BasketSVG = styled(Image)`
  width: auto;
  height: auto;
`;
