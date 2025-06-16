'use client';

import styled from 'styled-components';

export const StyledProductSpecWrapper = styled.div`
  max-width: 1200px;
  margin: 154px 0px;
`;

export const StyledProductGrid = styled.ul`
  margin-top: 40px;
`;

export const StyledGridItem = styled.li`
  padding: 16px 0px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  border-bottom: 0.5px solid var(--foreground);
  gap: 12px;

  &:first-child {
    border-top: 0.5px solid var(--foreground);
  }
`;
