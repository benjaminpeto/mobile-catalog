import { ParagraphText } from '@/components';
import type { ColorOption } from '@/types/api';

import {
  ButtonWrapper,
  ColorButton,
  ColorSwatchWrapper,
} from './color-selector.styles';

interface ColorSelectorProps {
  options: ColorOption[];
  selected: ColorOption;
  onSelect: (opt: ColorOption) => void;
}

export function ColorSelector({
  options,
  selected,
  onSelect,
}: ColorSelectorProps) {
  return (
    <>
      <ParagraphText>Color. Pick your favourite</ParagraphText>
      <ColorSwatchWrapper>
        {options.map(opt => (
          <ButtonWrapper key={opt.hexCode}>
            <ColorButton
              style={{ backgroundColor: opt.hexCode }}
              onClick={() => onSelect(opt)}
              className={selected.hexCode === opt.hexCode ? 'selected' : ''}
            />
          </ButtonWrapper>
        ))}
      </ColorSwatchWrapper>
    </>
  );
}
