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

const getCartCountMock = vi.fn();
vi.mock('@/hooks', () => ({
  useCartStorage: () => ({ getCartCount: getCartCountMock }),
}));

let cartVal: Array<{ id: string; name: string; price: number }> = [];
vi.mock('@/context/cart-context', () => ({
  useCart: () => ({ cart: cartVal }),
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
    mockPush.mockClear();
    cartVal = [];
  });

  it('renders only "Continue shopping" (desktop + mobile) when cart is empty', () => {
    getCartCountMock.mockReturnValueOnce(0);
    cartVal = [];

    render(<CartFooter />);

    const continues = screen.getAllByRole('button', {
      name: 'Continue shopping',
    });
    expect(continues).toHaveLength(2);

    expect(screen.queryByRole('button', { name: 'Pay' })).toBeNull();

    expect(screen.queryByTestId('paragraph-text')).toBeNull();
  });

  it('renders totals, shows Pay buttons, navigates and alerts correctly when cart has items', () => {
    // Prepare two items
    cartVal = [
      { id: 'a', name: 'A', price: 10 },
      { id: 'b', name: 'B', price: 20 },
    ];
    getCartCountMock.mockReturnValueOnce(cartVal.length);

    render(<CartFooter />);

    // --- Desktop "Continue shopping" navigates home ---
    const desktopContinue = screen
      .getAllByRole('button', { name: 'Continue shopping' })
      .find(btn => btn.classList.contains('desktop-only'));
    expect(desktopContinue).toBeTruthy();
    fireEvent.click(desktopContinue!);
    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
    mockPush.mockClear();

    // --- Total price is sum of item prices ---
    const sum = cartVal.reduce((s, i) => s + i.price, 0);
    const paymentInfo = screen.getByTestId('paragraph-text');
    expect(paymentInfo).toHaveClass('total-price');
    expect(paymentInfo).toHaveTextContent(`total ${sum} eur`);

    // --- Desktop "Pay" shows and alerts ---
    const desktopPay = screen
      .getAllByRole('button', { name: 'Pay' })
      .find(btn => btn.classList.contains('desktop-only'));
    expect(desktopPay).toBeTruthy();

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(desktopPay!);
    expect(alertSpy).toHaveBeenCalledWith(
      'Te gustaría trabajar conmigo? ... ¡Me encantaría!',
    );

    // --- Mobile actions ---
    const mobile = screen.getByTestId('mobile-actions');
    const mobileButtons = within(mobile).getAllByRole('button');

    expect(mobileButtons[0]).toHaveTextContent('Continue shopping');
    fireEvent.click(mobileButtons[0]);
    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
    expect(mockPush).toHaveBeenCalledTimes(1);
    mockPush.mockClear();

    expect(mobileButtons[1]).toHaveTextContent('Pay');
    fireEvent.click(mobileButtons[1]);
    expect(alertSpy).toHaveBeenCalledTimes(2);
  });
});
