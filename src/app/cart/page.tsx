import { MainHeading } from '@/components';
import { CartItem } from '@/components/CartItem/cart-item';

export default async function CartPage() {
  return (
    <>
      <MainHeading className="cart-heading">Cart(number of items)</MainHeading>
      <CartItem />
      <h2>something other</h2>
    </>
  );
}
