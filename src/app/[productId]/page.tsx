import { ProductClient } from '@/components';
import { getProductById } from '@/services';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return <ProductClient product={product} />;
}
