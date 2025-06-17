import Link from 'next/link';

import { Basket } from '../Basket';
import { Logo, NavContainer } from './navigation.styles';

export function Navigation() {
  return (
    <NavContainer>
      <Link href="/">
        <Logo src="/mbst.svg" alt="MBST Logo" width={74} height={24} />
      </Link>
      <Basket />
    </NavContainer>
  );
}
