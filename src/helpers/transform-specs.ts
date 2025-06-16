import { ProductEntity } from '@/types';

export const transformSpecifications = (product: ProductEntity) => {
  const { brand, name, description, specs } = product;

  const readableSpecs = Object.entries(specs).map(([key, value]) => ({
    title: key.replace(/([A-Z])/g, ' $1'), // add space before capital letters
    value,
  }));

  return [
    { title: 'brand', value: brand },
    { title: 'name', value: name },
    { title: 'description', value: description },
    ...readableSpecs,
  ];
};
