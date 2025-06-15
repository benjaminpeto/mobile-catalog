import { Basket } from '../Basket';
import { Logo, NavContainer } from './navigation.styles';

export function Navigation() {
  return (
    <NavContainer>
      <Logo src="/mbst.svg" alt="MBST Logo" width={74} height={24} />
      <Basket />
    </NavContainer>
  );
}
