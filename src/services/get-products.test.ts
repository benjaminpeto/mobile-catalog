// src/services/get-products.test.ts
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ErrorEntity, ProductListEntity } from '@/types/api';

describe('getProducts', () => {
  const MOCK_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
  const MOCK_KEY = 'test-key-123';

  beforeAll(() => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', MOCK_URL);
    vi.stubEnv('NEXT_PUBLIC_API_KEY', MOCK_KEY);
  });

  // reset modules and mocks so BASE_URL is re‐read on each import
  beforeEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  const sampleList: ProductListEntity[] = [
    {
      id: '1',
      brand: 'BrandA',
      name: 'ModelX',
      basePrice: 100,
      imageUrl: 'https://example.com/x.jpg',
    },
    {
      id: '2',
      brand: 'BrandB',
      name: 'ModelY',
      basePrice: 200,
      imageUrl: 'https://example.com/y.jpg',
    },
  ];

  it('fetches product list without search and returns data', async () => {
    // import after stubbing env
    const { getProducts } = await import('./get-products');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleList),
      }),
    );

    const result = await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${MOCK_URL}/products`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          'x-api-key': MOCK_KEY,
          'Content-Type': 'application/json',
        },
      }),
    );
    expect(result).toEqual(sampleList);
  });

  it('appends `?search=` when a search term is provided', async () => {
    const term = 'iphone';
    const expectedUrl = `${MOCK_URL}/products?search=${encodeURIComponent(term)}`;

    const { getProducts } = await import('./get-products');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(sampleList),
      }),
    );

    await getProducts(term);

    expect(fetch).toHaveBeenCalledWith(
      expectedUrl,
      expect.objectContaining({
        method: 'GET',
      }),
    );
  });

  it('throws with errBody.message when response.ok is false and message is set', async () => {
    const errorBody: ErrorEntity = {
      error: 'Err',
      message: 'Bad query',
    };

    const { getProducts } = await import('./get-products');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    );

    await expect(getProducts()).rejects.toThrow('Bad query');
  });

  it('throws with errBody.error when message is empty but error is set', async () => {
    const errorBody: ErrorEntity = {
      error: 'ServerError',
      message: '',
    };

    const { getProducts } = await import('./get-products');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    );

    await expect(getProducts()).rejects.toThrow('ServerError');
  });

  it('throws fallback message when both error and message are empty', async () => {
    const errorBody: ErrorEntity = {
      error: '',
      message: '',
    };

    const { getProducts } = await import('./get-products');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorBody),
      }),
    );

    await expect(getProducts()).rejects.toThrow('Failed to load products');
  });
});
