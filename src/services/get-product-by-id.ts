'use server';

import { ErrorEntity, ProductEntity } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

/**
 * Fetch the full detail for a single product by its ID.
 */
export async function getProductById(id: string): Promise<ProductEntity> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errBody: ErrorEntity = await res.json();
    throw new Error(
      errBody.message || errBody.error || `Failed to load product ${id}`,
    );
  }

  return res.json();
}
