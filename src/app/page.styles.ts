'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  text-align: center;
  color: red;
`;

export const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;
