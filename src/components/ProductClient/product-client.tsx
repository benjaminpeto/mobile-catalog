'use client';

import {
  Carousel,
  MainProductContainer,
  MobileCard,
  ProductSpecs,
} from '@/components';
import type { ProductEntity } from '@/types/api';

export interface ProductClientProps {
  product: ProductEntity;
}

export function ProductClient({ product }: ProductClientProps) {
  return (
    <>
      <MainProductContainer product={product} />

      <ProductSpecs product={product} />

      <Carousel
        items={product.similarProducts.map((similarProduct, idx) => (
          <MobileCard
            key={`${idx}-${similarProduct.id}`}
            idx={idx}
            productId={similarProduct.id}
            name={similarProduct.name}
            brand={similarProduct.brand}
            price={similarProduct.basePrice}
            imageUrl={similarProduct.imageUrl}
          />
        ))}
      />
    </>
  );
}
