'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const ProductContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px;
  width: 100%;
  max-width: 1200px;
  margin-top: 104px;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    margin-top: 0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 510px;
  height: 630px;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

export const ProductImage = styled(Image)`
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  height: 100%;

  &.visible {
    opacity: 1;
    z-index: 2;
  }

  &.hidden {
    opacity: 0.2;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    max-width: 400px;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & .selected-color {
    margin-bottom: 41px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

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
