import { CartFooter, CartItem, MainHeading } from '@/components';

import { CartPageContainer } from './layout.styles';

export default async function CartPage() {
  return (
    <CartPageContainer>
      <MainHeading className="cart-heading">Cart(number of items)</MainHeading>
      <div className="content">
        <CartItem />
      </div>
      <CartFooter />
    </CartPageContainer>
  );
}
