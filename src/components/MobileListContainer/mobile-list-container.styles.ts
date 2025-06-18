'use client';
import { styled } from 'styled-components';

export const MobileListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  margin-top: 148px;
  gap: 0.5px; /* Ensures consistent spacing between items for outlines*/
  padding: 48px 100px;

  @media (max-width: 1536px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    padding: 48px 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    padding: 48px 16px;
  }
`;
