import Link from 'next/link';

import { Basket } from '../Basket';
import { Logo, NavContainer } from './navigation.styles';

export function Navigation() {
  return (
    <NavContainer>
      <Link href="/" scroll={false}>
        {/* scroll false as on the router.push()... annoying, isn't it? -- https://github.com/vercel/next.js/discussions/64534 */}
        <Logo src="/mbst.svg" alt="MBST Logo" width={74} height={24} />
      </Link>
      <Basket />
    </NavContainer>
  );
}
