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
