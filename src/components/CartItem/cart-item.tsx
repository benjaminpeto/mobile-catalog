'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CartItem as CartItemInferface, useCart } from '@/context/cart-context';
import { useCartStorage } from '@/hooks';

import { RemoveButton } from '../Buttons/remove-button';
import { SubHeading } from '../Header';

export function CartItem() {
  const { cart, setCart } = useCart();
  const { removeItemFromStorage } = useCartStorage();
  const [hydratedCart, setHydratedCart] = useState<CartItemInferface[]>([]);

  useEffect(() => {
    // ensure the cart is hydrated after the client-side rendering
    setHydratedCart(cart);
  }, [cart]);

  const handleRemoveItem = (itemName: string) => {
    const updatedCart = cart.filter(item => item.name !== itemName);
    setCart(updatedCart);
    removeItemFromStorage(itemName);
  };

  return (
    <article>
      {hydratedCart.map(item => (
        <div key={item.name}>
          <Image src={item.imageUrl} width={262} height={324} alt={item.name} />
          <div>
            <SubHeading>{item.name}</SubHeading>
            <SubHeading>{item.price}</SubHeading>
            <RemoveButton onClick={() => handleRemoveItem(item.name)} />
          </div>
        </div>
      ))}
    </article>
  );
}
