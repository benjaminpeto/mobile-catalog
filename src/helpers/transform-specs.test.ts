import { describe, expect, it } from 'vitest';

import type { ProductEntity, ProductSpecs } from '@/types';

import { transformSpecifications } from './transform-specs';

describe('transformSpecifications', () => {
  const baseProduct = {
    id: 'p100',
    brand: 'Galaxy',
    name: 'Galaxy S21',
    description: 'Flagship Samsung phone',
    basePrice: 799,
    rating: 4.7,
    colorOptions: [],
    storageOptions: [],
    similarProducts: [],
  } as Omit<ProductEntity, 'specs'>;

  const fullSpecs: ProductSpecs = {
    screen: '6.2"',
    resolution: '1080×2400',
    processor: 'Exynos 2100',
    mainCamera: '12MP',
    selfieCamera: '10MP',
    battery: '4000mAh',
    os: 'Android 11',
    screenRefreshRate: '120Hz',
  };

  it('returns only brand, name, description when specs is empty', () => {
    const product: ProductEntity = {
      ...baseProduct,
      specs: {} as ProductSpecs,
    };
    const result = transformSpecifications(product);

    expect(result).toEqual([
      { title: 'brand', value: baseProduct.brand },
      { title: 'name', value: baseProduct.name },
      { title: 'description', value: baseProduct.description },
    ]);
  });

  it('maps each spec key to a title with spaces before capitals', () => {
    const product: ProductEntity = { ...baseProduct, specs: fullSpecs };
    const result = transformSpecifications(product);

    expect(result[0]).toEqual({ title: 'brand', value: 'Galaxy' });
    expect(result[1]).toEqual({ title: 'name', value: 'Galaxy S21' });
    expect(result[2]).toEqual({
      title: 'description',
      value: 'Flagship Samsung phone',
    });

    const specEntries = result.slice(3);
    const expectedTitles = [
      'screen',
      'resolution',
      'processor',
      'main Camera',
      'selfie Camera',
      'battery',
      'os',
      'screen Refresh Rate',
    ];
    const expectedValues = Object.values(fullSpecs);

    expectedTitles.forEach((title, idx) => {
      expect(specEntries[idx]).toEqual({
        title,
        value: expectedValues[idx],
      });
    });
  });

  it('returns correct length: 3 + number of spec keys', () => {
    const product: ProductEntity = { ...baseProduct, specs: fullSpecs };
    const result = transformSpecifications(product);
    expect(result).toHaveLength(3 + Object.keys(fullSpecs).length);
  });

  it('handles a specs object with missing keys by only mapping provided ones', () => {
    const partialSpecs = {
      screen: '5.8"',
      battery: '3500mAh',
    } as Partial<ProductSpecs> as ProductSpecs;
    const product: ProductEntity = { ...baseProduct, specs: partialSpecs };
    const result = transformSpecifications(product);

    expect(result).toEqual([
      { title: 'brand', value: 'Galaxy' },
      { title: 'name', value: 'Galaxy S21' },
      { title: 'description', value: 'Flagship Samsung phone' },
      { title: 'screen', value: '5.8"' },
      { title: 'battery', value: '3500mAh' },
    ]);
  });
});
