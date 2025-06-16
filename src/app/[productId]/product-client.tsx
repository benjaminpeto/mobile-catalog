'use client';

import { MainProductContainer, MobileCard, ProductSpecs } from '@/components';
import type { ProductEntity } from '@/types/api';

export interface ProductClientProps {
  product: ProductEntity;
}

export default function ProductClient({ product }: ProductClientProps) {
  return (
    <>
      <MainProductContainer product={product} />

      <ProductSpecs product={product} />

      <h2>Similar Products</h2>
      <div>
        {product.similarProducts.map((similarProduct, idx) => (
          <MobileCard
            key={`${idx}-${similarProduct.id}`}
            idx={idx}
            productId={similarProduct.id}
            name={similarProduct.name}
            brand={similarProduct.brand}
            price={similarProduct.basePrice}
            imageUrl={similarProduct.imageUrl}
            onClick={() =>
              console.log(`Clicked on product ${similarProduct.id}`)
            }
          />
        ))}
      </div>
    </>
  );
}
