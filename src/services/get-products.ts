// services/get-products.ts
'use server';

import { ErrorEntity, ProductListEntity } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

/**
 * Fetch the list of products, optionally filtered by name or brand,
 * and paginated with `limit` and `offset`.
 */
export async function getProducts(
  search?: string,
  limit = 20,
  offset = 0,
): Promise<ProductListEntity[]> {
  const url = new URL(`${BASE_URL}/products`);

  if (search) {
    url.searchParams.set('search', search);
  }
  // set the maximum number of items to return
  url.searchParams.set('limit', String(limit));
  // set the starting position (0-based)
  url.searchParams.set('offset', String(offset));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    // by default this fetch will be cached; pass `{ cache: 'no-store' }` to disable
  });

  if (!res.ok) {
    const errBody: ErrorEntity = await res.json();
    throw new Error(
      errBody.message || errBody.error || 'Failed to load products',
    );
  }

  return res.json();
}
