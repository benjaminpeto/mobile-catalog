import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getProductById } from '@/services';
import type { ErrorEntity, ProductEntity } from '@/types/api';

import { GET } from './route';

vi.mock('@/services', () => ({
  getProductById: vi.fn(),
}));

describe('GET /api/products/[productId]', () => {
  const sampleProduct: ProductEntity = {
    id: '1',
    brand: 'BrandA',
    name: 'ModelX',
    description: 'A great phone',
    basePrice: 499,
    rating: 4.2,
    specs: {
      screen: '6.1 inch',
      resolution: '1170x2532',
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
    storageOptions: [
      { capacity: '64GB', price: 499 },
      { capacity: '128GB', price: 549 },
    ],
    similarProducts: [
      {
        id: '2',
        brand: 'BrandA',
        name: 'ModelY',
        basePrice: 599,
        imageUrl: 'https://example.com/y.jpg',
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns 200 and the product when getProductById resolves', async () => {
    (getProductById as Mock).mockResolvedValue(sampleProduct);

    const req = new Request('http://localhost/api/products/1');
    const context = {
      params: Promise.resolve({ productId: '1' }),
    };

    const res = await GET(req as any, context);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual(sampleProduct);
    expect(getProductById).toHaveBeenCalledOnce();
    expect(getProductById).toHaveBeenCalledWith('1');
  });

  it('returns 500 and an error payload when getProductById throws', async () => {
    const error = new Error('Not found');
    (getProductById as Mock).mockRejectedValue(error);

    const req = new Request('http://localhost/api/products/does-not-exist');
    const context = {
      params: Promise.resolve({ productId: 'does-not-exist' }),
    };

    const res = await GET(req as any, context);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({
      error: 'FetchError',
      message: 'Not found',
    } as ErrorEntity);
    expect(getProductById).toHaveBeenCalledOnce();
    expect(getProductById).toHaveBeenCalledWith('does-not-exist');
  });
});
