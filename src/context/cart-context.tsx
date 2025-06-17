'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  name: string;
  selectedStorage: string;
  selectedColor: string;
  price: number;
  imageUrl: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // using if (typeof window !== 'undefined') or similar client-side checks can cause mismatches
    // hydrate after client-side rendering in the CartItem component to avoid uncaught error
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
