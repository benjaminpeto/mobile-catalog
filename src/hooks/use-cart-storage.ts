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

  const removeItemFromStorage = (itemName: string) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const updatedCart = parsedCart.filter(
        (item: { name: string }) => item.name !== itemName,
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return { removeItemFromStorage };
}
