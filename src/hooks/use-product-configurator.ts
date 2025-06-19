import { useMemo, useState } from 'react';

import type { ColorOption, ProductEntity, StorageOption } from '@/types/api';

export function useProductConfigurator(product: ProductEntity) {
  const { basePrice, colorOptions } = product;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );

  const price = useMemo(
    () => (selectedStorage ? selectedStorage.price : basePrice),
    [selectedStorage, basePrice],
  );

  const canAdd = selectedStorage !== null;

  return {
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    price,
    canAdd,
  };
}
