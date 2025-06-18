import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CartFooter } from './cart-footer';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('../Buttons', () => ({
  __esModule: true,
  Button: ({ variant, text, className, onClick }: any) => (
    <button data-variant={variant} className={className} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock('../Header', () => ({
  __esModule: true,
  ParagraphText: ({ className, children }: any) => (
    <div data-testid="paragraph-text" className={className}>
      {children}
    </div>
  ),
}));

vi.mock('./cart-footer.styles', () => ({
  __esModule: true,
  StyledCartFooterWrapper: ({ children }: any) => <div>{children}</div>,
  StyledPaymentInfo: ({ children }: any) => <div>{children}</div>,
  StyledMobileActions: ({ children }: any) => (
    <div data-testid="mobile-actions">{children}</div>
  ),
}));

describe('CartFooter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders desktop and mobile buttons, plus payment info', () => {
    render(<CartFooter />);

    // -- Desktop "Continue shopping" --
    const desktopContinue = screen
      .getAllByRole('button', { name: 'Continue shopping' })
      .find(btn => btn.classList.contains('desktop-only'));
    expect(desktopContinue).toBeInTheDocument();
    expect(desktopContinue).toHaveAttribute('data-variant', 'secondary');

    // -- Desktop "Pay" --
    const desktopPay = screen
      .getAllByRole('button', { name: 'Pay' })
      .find(btn => btn.classList.contains('desktop-only'));
    expect(desktopPay).toBeInTheDocument();
    expect(desktopPay).toHaveAttribute('data-variant', 'primary');

    // -- Total price info --
    const paymentInfo = screen.getByTestId('paragraph-text');
    expect(paymentInfo).toHaveClass('total-price');
    // children are two spans: "total " and "[price] eur"
    expect(paymentInfo).toHaveTextContent('total [price] eur');

    // -- Mobile actions wrapper --
    const mobile = screen.getByTestId('mobile-actions');
    const mobileButtons = within(mobile).getAllByRole('button');
    expect(mobileButtons).toHaveLength(2);
    expect(mobileButtons[0]).toHaveTextContent('Continue shopping');
    expect(mobileButtons[1]).toHaveTextContent('Pay');
  });

  it('navigates home when desktop "Continue shopping" is clicked', () => {
    render(<CartFooter />);
    const desktopContinue = screen
      .getAllByRole('button', { name: 'Continue shopping' })
      .find(btn => btn.classList.contains('desktop-only'));
    fireEvent.click(desktopContinue!);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('does not navigate when "Pay" is clicked', () => {
    render(<CartFooter />);
    const desktopPay = screen
      .getAllByRole('button', { name: 'Pay' })
      .find(btn => btn.classList.contains('desktop-only'));
    fireEvent.click(desktopPay!);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
