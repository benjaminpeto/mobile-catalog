'use client';

import { useEffect, useState } from 'react';

import { CartItem as CartItemInferface, useCart } from '@/context/cart-context';
import { useCartStorage } from '@/hooks';

import { RemoveButton } from '../Buttons/remove-button';
import { ParagraphText, SubHeading } from '../Header';
import {
  StyledCartItem,
  StyledCartItemImage,
  StyledCartItemInfoWrapper,
  StyledCartItemWrapper,
} from './cart-item.styles';

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
    <StyledCartItem>
      {hydratedCart.map(item => (
        <StyledCartItemWrapper key={item.name}>
          <StyledCartItemImage
            src={item.imageUrl}
            width={262}
            height={324}
            alt={item.name}
          />
          <StyledCartItemInfoWrapper>
            <div>
              <SubHeading>{item.name}</SubHeading>
              <ParagraphText $fontSize="12px">
                {item.selectedStorage} | {item.selectedColor}
              </ParagraphText>
              <ParagraphText $fontSize="12px" style={{ paddingTop: '20px' }}>
                {item.price} EUR
              </ParagraphText>
            </div>

            <RemoveButton onClick={() => handleRemoveItem(item.name)} />
          </StyledCartItemInfoWrapper>
        </StyledCartItemWrapper>
      ))}
    </StyledCartItem>
  );
}
