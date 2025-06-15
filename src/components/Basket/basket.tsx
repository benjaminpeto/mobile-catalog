import { BasketContainer, BasketSVG } from './basket.styles';

export function Basket() {
  return (
    <BasketContainer>
      <BasketSVG src="/basket.svg" alt="basket svg" width={12.24} height={16} />
      <span>0</span>
    </BasketContainer>
  );
}
