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

  // as IDs are not unique, we need to handle the removal of items based on their ID, selectedStorage, and selectedColor
  const handleRemoveItem = (
    id: string,
    selectedStorage: string,
    selectedColor: string,
  ) => {
    const updatedCart = cart.filter(
      item =>
        item.id !== id ||
        item.selectedStorage !== selectedStorage ||
        item.selectedColor !== selectedColor,
    );
    setCart(updatedCart);
    removeItemFromStorage(id, selectedStorage, selectedColor);
  };

  return (
    <StyledCartItem>
      {hydratedCart.map(item => (
        <StyledCartItemWrapper
          key={`${item.id}-${item.selectedStorage}-${item.selectedColor}`}
        >
          <StyledCartItemImage
            src={item.imageUrl}
            width={262}
            height={324}
            alt={item.name}
            priority={true} // disables lazy loading as the image is above the fold and LCP, will improve performance
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

            <RemoveButton
              onClick={() =>
                handleRemoveItem(
                  item.id,
                  item.selectedStorage,
                  item.selectedColor,
                )
              }
            />
          </StyledCartItemInfoWrapper>
        </StyledCartItemWrapper>
      ))}
    </StyledCartItem>
  );
}
