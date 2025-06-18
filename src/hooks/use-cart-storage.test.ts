import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCartStorage } from './use-cart-storage';

let cartVal: Array<{
  id: string;
  name: string;
  selectedStorage: string;
  selectedColor: string;
}> = [];
const setCartMock = vi.fn();
vi.mock('@/context/cart-context', () => ({
  useCart: () => ({ cart: cartVal, setCart: setCartMock }),
}));

describe('useCartStorage', () => {
  beforeEach(() => {
    cartVal = [];
    setCartMock.mockClear();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('writes cart to localStorage on mount (and whenever cart changes)', () => {
    cartVal = [
      {
        id: '1',
        name: 'Foo',
        selectedStorage: '64GB',
        selectedColor: 'Black',
      },
    ];
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    renderHook(() => useCartStorage());

    expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify(cartVal));
  });

  it('reads saved cart from localStorage on mount and calls setCart', () => {
    const saved = [
      {
        id: '2',
        name: 'Bar',
        selectedStorage: '128GB',
        selectedColor: 'White',
      },
    ];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify(saved),
    );

    renderHook(() => useCartStorage());

    expect(setCartMock).toHaveBeenCalledWith(saved);
  });

  it('removeItemFromStorage filters out the specified item and updates localStorage', () => {
    const initial = [
      {
        id: '1',
        name: 'A',
        selectedStorage: '64GB',
        selectedColor: 'Black',
      },
      {
        id: '2',
        name: 'B',
        selectedStorage: '128GB',
        selectedColor: 'White',
      },
    ];
    cartVal = initial.slice(); // feed into hook
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useCartStorage());
    expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify(initial));

    setItemSpy.mockClear();
    act(() => {
      result.current.removeItemFromStorage('1', '64GB', 'Black');
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          id: '2',
          name: 'B',
          selectedStorage: '128GB',
          selectedColor: 'White',
        },
      ]),
    );
    expect(localStorage.getItem('cart')).toBe(
      JSON.stringify([
        {
          id: '2',
          name: 'B',
          selectedStorage: '128GB',
          selectedColor: 'White',
        },
      ]),
    );
  });
});
