'use client';

import { useCart } from '@/context/cart-context';

import { RemoveButton } from '../Buttons/remove-button';
import { ParagraphText, SubHeading } from '../Header';
import {
  StyledCartItem,
  StyledCartItemImage,
  StyledCartItemInfoWrapper,
  StyledCartItemWrapper,
} from './cart-item.styles';

export function CartItem() {
  const { cart, removeFromCart } = useCart();

  return (
    <StyledCartItem suppressHydrationWarning>
      {cart.map(item => (
        <StyledCartItemWrapper
          key={`${item.id}-${item.selectedStorage}-${item.selectedColor}`}
        >
          <StyledCartItemImage
            src={item.imageUrl}
            width={262}
            height={324}
            alt={item.name}
            priority={true}
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
                removeFromCart(
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
