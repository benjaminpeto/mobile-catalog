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

  it('writes cart to localStorage on mount and whenever cart changes', () => {
    cartVal = [
      { id: '1', name: 'Foo', selectedStorage: '64GB', selectedColor: 'Black' },
    ];
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { rerender } = renderHook(() => useCartStorage());

    expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify(cartVal));

    setItemSpy.mockClear();

    cartVal = [
      ...cartVal,
      {
        id: '2',
        name: 'Bar',
        selectedStorage: '128GB',
        selectedColor: 'White',
      },
    ];
    rerender();

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
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
      JSON.stringify(saved),
    );

    renderHook(() => useCartStorage());

    expect(setCartMock).toHaveBeenCalledWith(saved);
  });

  it('removeItemFromStorage filters out the specified item and updates localStorage', () => {
    const initial = [
      { id: '1', name: 'A', selectedStorage: '64GB', selectedColor: 'Black' },
      { id: '2', name: 'B', selectedStorage: '128GB', selectedColor: 'White' },
    ];
    cartVal = initial.slice();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useCartStorage());
    expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify(initial));

    setItemSpy.mockClear();
    act(() => {
      result.current.removeItemFromStorage('1', '64GB', 'Black');
    });

    const expected = [
      { id: '2', name: 'B', selectedStorage: '128GB', selectedColor: 'White' },
    ];
    expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify(expected));
    expect(localStorage.getItem('cart')).toBe(JSON.stringify(expected));
  });

  it('removeItemFromStorage is a no-op when there is no saved cart', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useCartStorage());

    setItemSpy.mockClear();

    act(() => {
      result.current.removeItemFromStorage('does', 'not', 'exist');
    });

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('getCartCount returns the number of items in storage, or 0 if none', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    const { result, rerender } = renderHook(() => useCartStorage());
    expect(result.current.getCartCount()).toBe(0);

    const three = [
      { id: 'a', name: 'A', selectedStorage: 'S', selectedColor: 'C' },
      { id: 'b', name: 'B', selectedStorage: 'S', selectedColor: 'C' },
      { id: 'c', name: 'C', selectedStorage: 'S', selectedColor: 'C' },
    ];
    localStorage.setItem('cart', JSON.stringify(three));

    rerender();
    expect(result.current.getCartCount()).toBe(3);
  });
});
