import { type NextRequest, NextResponse } from 'next/server';

import { getProductById } from '@/services';
import type { ErrorEntity, ProductEntity } from '@/types/api';

export const dynamic = 'force-static';
export const revalidate = 60; // 60 seconds

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
): Promise<NextResponse<ProductEntity | ErrorEntity>> {
  try {
    const { productId } = await params;
    const product: ProductEntity = await getProductById(productId);

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    const message = (err as Error).message;
    const payload: ErrorEntity = { error: 'FetchError', message };

    return NextResponse.json(payload, { status: 500 });
  }
}
