import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CartFooter } from './cart-footer';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ push: mockPush }),
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
    <div className={className}>{children}</div>
  ),
}));

vi.mock('./cart-footer.styles', () => ({
  __esModule: true,
  StyledCartFooterWrapper: ({ children }: any) => <div>{children}</div>,
  StyledPaymentInfo: ({ children }: any) => <div>{children}</div>,
  StyledMobileActions: ({ children }: any) => <div>{children}</div>,
}));

describe('CartFooter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
    cartVal = [];
  });

  it('renders only "Continue shopping" (desktop + mobile) when cart is empty', () => {
    render(<CartFooter />);
    const continues = screen.getAllByRole('button', {
      name: 'Continue shopping',
    });

    expect(continues).toHaveLength(2);
    expect(screen.queryByRole('button', { name: 'Pay' })).toBeNull();
    expect(screen.queryByText(/^total/)).toBeNull();
  });

  it('renders totals, shows Pay buttons, navigates and alerts correctly when cart has items', () => {
    cartVal = [
      { id: 'a', name: 'A', price: 10 },
      { id: 'b', name: 'B', price: 20 },
    ];

    render(<CartFooter />);

    // --- Desktop "Continue shopping" navigates home ---
    const continues = screen.getAllByRole('button', {
      name: 'Continue shopping',
    });
    const desktopContinue = continues.find(btn =>
      btn.classList.contains('desktop-only'),
    );
    expect(desktopContinue).toBeTruthy();
    fireEvent.click(desktopContinue!);
    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
    mockPush.mockClear();

    // --- Total price is sum of item prices ---
    const sum = cartVal.reduce((s, i) => s + i.price, 0);
    const paymentInfo = screen.getByText(
      (_, node) => node?.classList?.contains('total-price') ?? false,
    );
    expect(paymentInfo).toHaveClass('total-price');
    expect(paymentInfo).toHaveTextContent(`total ${sum} eur`);

    // --- Desktop "Pay" shows and alerts ---
    const pays = screen.getAllByRole('button', { name: 'Pay' });
    const desktopPay = pays.find(btn => btn.classList.contains('desktop-only'));
    expect(desktopPay).toBeTruthy();

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(desktopPay!);
    expect(alertSpy).toHaveBeenCalledWith(
      'Te gustaría trabajar conmigo? ... ¡Me encantaría!',
    );

    // --- Mobile actions ---
    const mobileContinue = continues.find(
      btn => !btn.classList.contains('desktop-only'),
    );
    expect(mobileContinue).toBeTruthy();
    fireEvent.click(mobileContinue!);
    expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
    mockPush.mockClear();

    const mobilePay = pays.find(btn => !btn.classList.contains('desktop-only'));
    expect(mobilePay).toBeTruthy();
    fireEvent.click(mobilePay!);
    expect(alertSpy).toHaveBeenCalledTimes(2);
  });
});
