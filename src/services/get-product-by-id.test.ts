import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ErrorEntity, ProductEntity } from '@/types/api';

import { getProductById } from './get-product-by-id';

describe('getProductById', () => {
  const PRODUCT_ID = '1';
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const MOCK_PRODUCT: ProductEntity = {
    id: PRODUCT_ID,
    brand: 'Apple',
    name: 'iPhone 12',
    description: 'Test description',
    basePrice: 909,
    rating: 4.5,
    specs: {
      screen: '6.1 inch',
      resolution: '1170 x 2532',
      processor: 'A14 Bionic',
      mainCamera: '12 MP',
      selfieCamera: '12 MP',
      battery: '2815 mAh',
      os: 'iOS',
      screenRefreshRate: '60Hz',
    },
    colorOptions: [
      {
        name: 'Black',
        hexCode: '#000000',
        imageUrl: 'https://example.com/black.jpg',
      },
    ],
    storageOptions: [{ capacity: '64GB', price: 909 }],
    similarProducts: [],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('resolves with product data when fetch returns ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(MOCK_PRODUCT),
      }),
    ) as unknown as typeof fetch;

    const result = await getProductById(PRODUCT_ID);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/products/${PRODUCT_ID}`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ 'x-api-key': API_KEY }),
      }),
    );
    expect(result).toEqual(MOCK_PRODUCT);
  });

  it('throws API error when fetch returns not ok and errBody.message is set', async () => {
    const errorBody: ErrorEntity = {
      error: 'NotFound',
      message: 'Product not found',
    };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    ) as unknown as typeof fetch;

    await expect(getProductById(PRODUCT_ID)).rejects.toThrow(
      'Product not found',
    );
  });

  it('throws API error when fetch returns not ok and message is empty but errBody.error is set', async () => {
    const errorBody: ErrorEntity = { error: 'NotFound', message: '' };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    ) as unknown as typeof fetch;

    await expect(getProductById(PRODUCT_ID)).rejects.toThrow('NotFound');
  });

  it('throws fallback error when fetch returns not ok and both fields are empty', async () => {
    const errorBody: ErrorEntity = { error: '', message: '' };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    ) as unknown as typeof fetch;

    await expect(getProductById(PRODUCT_ID)).rejects.toThrow(
      `Failed to load product ${PRODUCT_ID}`,
    );
  });
});
