import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { MobileCard } from '@/components/MobileCard';

import { MobileListContainer } from './mobile-list-container';

vi.mock('@/components/MobileCard', () => ({
  __esModule: true,
  MobileCard: vi.fn().mockImplementation(({ name }) => <div>{name}</div>),
}));

describe('MobileListContainer', () => {
  const products = [
    {
      id: '1',
      brand: 'BrandA',
      name: 'Phone A',
      basePrice: 100,
      imageUrl: 'https://example.com/a.jpg',
    },
    {
      id: '2',
      brand: 'BrandB',
      name: 'Phone B',
      basePrice: 200,
      imageUrl: 'https://example.com/b.jpg',
    },
    {
      id: '3',
      brand: 'BrandC',
      name: 'Phone C',
      basePrice: 300,
      imageUrl: 'https://example.com/c.jpg',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a MobileCard for each product with the correct props', () => {
    render(<MobileListContainer products={products} />);

    const mockFn = MobileCard as unknown as Mock;
    expect(mockFn).toHaveBeenCalledTimes(products.length);

    products.forEach((prod, idx) => {
      const calledProps = mockFn.mock.calls[idx][0];
      expect(calledProps).toEqual(
        expect.objectContaining({
          idx,
          productId: prod.id,
          name: prod.name,
          brand: prod.brand,
          price: prod.basePrice,
          imageUrl: prod.imageUrl,
        }),
      );

      expect(screen.getByText(prod.name)).toBeInTheDocument();
    });
  });

  it('renders no MobileCard when products array is empty', () => {
    render(<MobileListContainer products={[]} />);

    const mockFn = MobileCard as unknown as Mock;
    expect(mockFn).not.toHaveBeenCalled();

    products.forEach(prod => {
      expect(screen.queryByText(prod.name)).toBeNull();
    });
  });
});
