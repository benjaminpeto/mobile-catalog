/**
 * API route to fetch a particular product.
 * Currently API routes are not used in the app, but this is a placeholder
 * for future development if you would wish to hide the real API endpoint.
 *
 * For now, we are using server components to fetch products directly
 * from the API, but this route can be used to add additional logic or
 * transformations before returning the data to the client.
 */

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
