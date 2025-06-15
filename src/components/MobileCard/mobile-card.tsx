import Link from 'next/link';

import { ParagraphText, SubHeading } from '../Header';
import {
  MobileCardContainer,
  MobileCardImage,
  MobileHeading,
  MobileTextContainer,
} from './mobile-card.styles';

interface MobileCardProps {
  idx: number;
  productId: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  onClick: () => void;
}

export function MobileCard({
  idx,
  productId,
  name,
  brand,
  price,
  imageUrl,
  onClick,
}: MobileCardProps) {
  return (
    <Link href={`/${productId}`}>
      <MobileCardContainer key={`${idx}-${productId}`}>
        <MobileCardImage
          src={imageUrl}
          alt={`${name} image`}
          width={312}
          height={257}
          style={{ objectFit: 'contain' }}
        />
        <MobileTextContainer>
          <ParagraphText fontSize="10px" color="var(--foreground-muted)">
            {brand}
          </ParagraphText>
          <MobileHeading>
            <SubHeading>{name}</SubHeading>
            <ParagraphText fontSize="12px">{price} EUR</ParagraphText>
          </MobileHeading>
        </MobileTextContainer>
      </MobileCardContainer>
    </Link>
  );
}
