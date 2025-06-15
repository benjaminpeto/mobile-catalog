'use client';

import Image from 'next/image';
import { styled } from 'styled-components';

export const MobileCardContainer = styled.article`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1 / 1;
  padding: 16px;
  outline: 0.5px solid var(--foreground);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: var(--foreground);
    transform: translateY(100%);
    transition: transform 0.5s ease-in-out;
    z-index: 0;
  }

  &:hover::before {
    transform: translateY(0%);
  }

  > * {
    position: relative;
    z-index: 1;
    color: inherit;
  }

  &:hover {
    color: var(--background);
  }
`;

export const MobileCardImage = styled(Image)`
  width: 80%;
  height: 80%;
  object-fit: contain;
  margin: 0 auto;
`;

export const MobileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 24px;
`;

export const MobileHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;
