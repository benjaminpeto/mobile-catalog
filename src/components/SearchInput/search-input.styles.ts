'use client';

import { styled } from 'styled-components';

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 100px;
  margin-top: 80px;
  gap: 12px;
`;

export const SearchInputField = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px 0px;
  border: none;
  border-bottom: 0.5px solid var(--foreground);

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--foreground);
  }
`;
