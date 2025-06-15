'use client';
import styled from 'styled-components';

export const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'disabled' | 'link';
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 40px;
  margin-top: 41px;
  cursor: ${({ variant }) =>
    variant === 'disabled' ? 'not-allowed' : 'pointer'};
  background: ${({ variant }) =>
    variant === 'primary'
      ? 'var(--foreground)'
      : variant === 'secondary'
        ? 'var(--background)'
        : variant === 'disabled'
          ? '#cccccc'
          : 'transparent'};
  border: ${({ variant }) =>
    variant === 'secondary' ? '1px solid var(--foreground)' : 'none'};
  color: ${({ variant }) =>
    variant === 'primary'
      ? 'var(--background)'
      : variant === 'secondary'
        ? 'var(--foreground)'
        : variant === 'disabled'
          ? 'var(--foreground)'
          : 'var(--foreground)'};
  text-decoration: ${({ variant }) =>
    variant === 'link' ? 'underline' : 'none'};

  &:hover {
    opacity: ${({ variant }) => (variant === 'disabled' ? 1 : 0.8)};
  }
`;

export const ButtonText = styled.span`
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
`;
