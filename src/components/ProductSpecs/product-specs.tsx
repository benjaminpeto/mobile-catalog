import React from 'react';

import { ProductClientProps } from '@/components';
import { transformSpecifications } from '@/helpers';

import { ParagraphText, SubHeading } from '../Header';
import {
  StyledGridItem,
  StyledProductGrid,
  StyledProductSpecWrapper,
} from './product-specs.styles';

export function ProductSpecs({ product }: ProductClientProps) {
  const specs = transformSpecifications(product);

  return (
    <StyledProductSpecWrapper>
      <SubHeading fontSize="20px">Specifications</SubHeading>
      <StyledProductGrid>
        {specs.map((spec, index) => (
          <StyledGridItem key={index}>
            <ParagraphText fontSize="12px">{spec.title}</ParagraphText>
            <ParagraphText fontSize="12px" texttransform="none">
              {spec.value}
            </ParagraphText>
          </StyledGridItem>
        ))}
      </StyledProductGrid>
    </StyledProductSpecWrapper>
  );
}
