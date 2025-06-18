'use client';

import { styled } from 'styled-components';

export const SearchInputContainer = styled.div`
  position: fixed;
  top: 75.5px;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 12px 100px;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 12px 40px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
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

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
