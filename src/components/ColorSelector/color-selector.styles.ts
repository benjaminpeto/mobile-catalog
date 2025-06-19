'use client';

import { styled } from 'styled-components';

export const ColorButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #cccccc;

  &:focus,
  &:active,
  &:hover {
    border: 1px solid black;
    transition: border 0.3s ease-in-out;
  }
`;

export const ColorSwatchWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
  margin-bottom: 8px;
`;
