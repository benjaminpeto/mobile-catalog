import { MobileCard } from '@/components/MobileCard';
import type { ProductListEntity } from '@/types/api';

import { MobileListGrid } from './mobile-list-container.styles';

interface MobileListContainerProps {
  products: ProductListEntity[];
}

export function MobileListContainer({ products }: MobileListContainerProps) {
  return (
    <MobileListGrid>
      {products.map((product, idx) => (
        <MobileCard
          key={`${idx}-${product.id}`}
          idx={idx}
          productId={product.id}
          name={product.name}
          brand={product.brand}
          price={product.basePrice}
          imageUrl={product.imageUrl}
        />
      ))}
    </MobileListGrid>
  );
}
