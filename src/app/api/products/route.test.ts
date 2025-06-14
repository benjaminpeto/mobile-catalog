import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getProducts } from '@/services';
import type { ErrorEntity, ProductListEntity } from '@/types/api';

import { GET } from './route';

vi.mock('@/services', () => ({
  getProducts: vi.fn(),
}));

describe('GET /api/products', () => {
  const sampleProducts: ProductListEntity[] = [
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

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns 200 with the full list when getProducts resolves', async () => {
    (getProducts as Mock).mockResolvedValue(sampleProducts);

    // Use a minimal mock of NextRequest for testing
    const req = { url: 'http://localhost/api/products' } as any;
    const res = await GET(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual(sampleProducts);

    expect(getProducts).toHaveBeenCalledWith(undefined);
  });

  it('returns 200 and passes the search query to getProducts', async () => {
    (getProducts as Mock).mockResolvedValue(sampleProducts);
    const req = { url: 'http://localhost/api/products?search=iphone' } as any;
    const res = await GET(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(sampleProducts);
    expect(getProducts).toHaveBeenCalledWith('iphone');
  });

  it('returns 500 and error payload when getProducts throws', async () => {
    const error = new Error('Oops, network down');
    (getProducts as Mock).mockRejectedValue(error);

    const req = { url: 'http://localhost/api/products' } as any;
    const res = await GET(req);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({
      error: 'FetchError',
      message: 'Oops, network down',
    } as ErrorEntity);
  });
});
