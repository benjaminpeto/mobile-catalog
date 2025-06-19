import { ParagraphText } from '@/components';
import type { StorageOption } from '@/types/api';

import { StorageButton, StorageSwatchWrapper } from './storage-selector.styles';

interface StorageSelectorProps {
  options: StorageOption[];
  selected: StorageOption | null;
  onSelect: (opt: StorageOption) => void;
}

export function StorageSelector({
  options,
  selected,
  onSelect,
}: StorageSelectorProps) {
  return (
    <>
      <ParagraphText>Storage. How much space do you need?</ParagraphText>
      <StorageSwatchWrapper>
        {options.map(opt => (
          <StorageButton
            key={opt.capacity}
            onClick={() => onSelect(opt)}
            className={selected?.capacity === opt.capacity ? 'selected' : ''}
          >
            {opt.capacity}
          </StorageButton>
        ))}
      </StorageSwatchWrapper>
    </>
  );
}
