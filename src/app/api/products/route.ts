/**
 * API route to fetch a list of products.
 * Currently API routes are not used in the app, but this is a placeholder
 * for future development if you would wish to hide the real API endpoint.
 *
 * For now, we are using server components to fetch products directly
 * from the API, but this route can be used to add additional logic or
 * transformations before returning the data to the client.
 */

import { type NextRequest, NextResponse } from 'next/server';

import { getProducts } from '@/services';
import type { ErrorEntity, ProductListEntity } from '@/types/api';

// Force static generation and revalidate every minutes
export const dynamic = 'force-static';
export const revalidate = 60; // 60 seconds

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProductListEntity[] | ErrorEntity>> {
  try {
    // Extract the optional `search` query parameter from the incoming URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? undefined;

    const products: ProductListEntity[] = await getProducts(search);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    const message = (error as Error).message;
    const payload: ErrorEntity = { error: 'FetchError', message };

    return NextResponse.json(payload, { status: 500 });
  }
}
