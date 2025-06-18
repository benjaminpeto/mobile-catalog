import { CartFooter, CartItem, MainHeading } from '@/components';

export default async function CartPage() {
  return (
    <>
      <MainHeading className="cart-heading">Cart(number of items)</MainHeading>
      <CartItem />
      <CartFooter />
    </>
  );
}
