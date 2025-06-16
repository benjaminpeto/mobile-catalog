'use client';

import { useState } from 'react';

import { Button } from '@/components';
import type { ColorOption, ProductEntity, StorageOption } from '@/types/api';

import { MainHeading, ParagraphText } from '../Header';
import {
  ButtonWrapper,
  ColorButton,
  ColorSwatchWrapper,
  ImageContainer,
  ProductContainer,
  ProductImage,
  SelectorWrapper,
  StorageButton,
  StorageSwatchWrapper,
} from './main-product-container.styles';

interface ProductClientProps {
  product: ProductEntity;
}

export function MainProductContainer({ product }: ProductClientProps) {
  const { name, colorOptions, storageOptions } = product;
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    product.colorOptions[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );

  return (
    <ProductContainer>
      <ImageContainer>
        {colorOptions.map(color => (
          <ProductImage
            key={color.hexCode}
            src={color.imageUrl}
            alt={`${name} - ${color.name}`}
            width={510}
            height={630}
            className={
              selectedColor.hexCode === color.hexCode ? 'visible' : 'hidden'
            }
          />
        ))}
      </ImageContainer>
      <SelectorWrapper>
        <MainHeading>{name}</MainHeading>
        <ParagraphText
          fontSize="20px"
          texttransform="none"
          style={{ marginBottom: '64px' }}
        >
          From {selectedStorage ? selectedStorage.price : product.basePrice} EUR
        </ParagraphText>

        <ParagraphText>Storage. How much space do you need?</ParagraphText>
        <StorageSwatchWrapper>
          {storageOptions.map(storage => (
            <StorageButton
              key={storage.capacity}
              onClick={() => setSelectedStorage(storage)}
              className={
                selectedStorage?.capacity === storage.capacity ? 'selected' : ''
              }
            >
              {storage.capacity}
            </StorageButton>
          ))}
        </StorageSwatchWrapper>

        <ParagraphText>Color. pick your favourite</ParagraphText>
        <ColorSwatchWrapper>
          {colorOptions.map(color => (
            <ButtonWrapper key={color.hexCode}>
              <ColorButton
                style={{ backgroundColor: color.hexCode }}
                onClick={() => setSelectedColor(color)}
              />
            </ButtonWrapper>
          ))}
        </ColorSwatchWrapper>
        {selectedColor && (
          <ParagraphText texttransform="capitalize">
            {selectedColor.name}
          </ParagraphText>
        )}
        <Button
          text="Añadir"
          variant={!selectedColor || !selectedStorage ? 'disabled' : 'primary'}
          onClick={() => console.log('Buy Now clicked')}
        />
      </SelectorWrapper>
    </ProductContainer>
  );
}
