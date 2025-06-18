'use client';

import { styled } from 'styled-components';

export const MainHeading = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 300;
`;

export const SubHeading = styled.h2<{
  $fontSize?: string;
}>`
  font-size: ${({ $fontSize }) => $fontSize || '12px'};
  text-transform: uppercase;
  font-weight: 300;
`;

export const ParagraphText = styled.p<{
  $fontSize?: string;
  $textTransform?: string;
  $color?: string;
}>`
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  text-transform: ${({ $textTransform }) => $textTransform || 'uppercase'};
  color: ${({ $color }) => $color || 'var(--foreground)'};
`;
