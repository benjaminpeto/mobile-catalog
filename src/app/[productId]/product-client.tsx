'use client';

import { MainProductContainer } from '@/components';
import { MobileCard } from '@/components/MobileCard';
import type { ProductEntity } from '@/types/api';

interface ProductClientProps {
  product: ProductEntity;
}

export default function ProductClient({ product }: ProductClientProps) {
  return (
    <>
      <MainProductContainer product={product} />

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
