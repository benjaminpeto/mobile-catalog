'use client';

import { styled } from 'styled-components';

export const StorageSwatchWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 40px;
  gap: 0.5px;
`;

export const StorageButton = styled.button`
  cursor: pointer;
  padding: 24px;
  border: none;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 14px;
  background-color: var(--background);
  outline: 1px solid #cccccc;

  &.selected {
    outline: 1px solid var(--foreground);
  }
`;
