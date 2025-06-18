import { useEffect } from 'react';

import { useCart } from '@/context/cart-context';

export function useCartStorage() {
  const { cart, setCart } = useCart();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
  }, [setCart]);

  const removeItemFromStorage = (
    id: string,
    selectedStorage: string,
    selectedColor: string,
  ) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const updatedCart = parsedCart.filter(
        (item: {
          id: string;
          selectedStorage: string;
          selectedColor: string;
        }) =>
          item.id !== id ||
          item.selectedStorage !== selectedStorage ||
          item.selectedColor !== selectedColor,
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const getCartCount = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return parsedCart.length;
    }
    return 0;
  };

  return { removeItemFromStorage, getCartCount };
}
