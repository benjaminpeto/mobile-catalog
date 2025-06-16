import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { transformSpecifications } from '@/helpers';
import type { ProductEntity } from '@/types/api';

import { ProductSpecs } from './product-specs';

vi.mock('@/helpers', () => ({
  __esModule: true,
  transformSpecifications: vi.fn(),
}));

describe('ProductSpecs', () => {
  const mockTransform = transformSpecifications as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls transformSpecifications with the passed product', () => {
    const fakeProduct = { id: '123' } as ProductEntity;
    mockTransform.mockReturnValue([]);
    render(<ProductSpecs product={fakeProduct} />);
    expect(mockTransform).toHaveBeenCalledTimes(1);
    expect(mockTransform).toHaveBeenCalledWith(fakeProduct);
  });

  it('renders the "Specifications" subheading', () => {
    mockTransform.mockReturnValue([]);
    render(<ProductSpecs product={{} as ProductEntity} />);
    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('renders one list item per spec returned by transformSpecifications', () => {
    const specs = [
      { title: 'Display', value: '6.1 inch' },
      { title: 'Battery', value: '4000mAh' },
      { title: 'Weight', value: '180g' },
    ];
    mockTransform.mockReturnValue(specs);
    render(<ProductSpecs product={{} as ProductEntity} />);

    specs.forEach(spec => {
      expect(screen.getByText(spec.title)).toBeInTheDocument();
      expect(screen.getByText(spec.value)).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(specs.length);
  });

  it('renders no list items when transformSpecifications returns an empty array', () => {
    mockTransform.mockReturnValue([]);
    render(<ProductSpecs product={{} as ProductEntity} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
