'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button } from '@/components';
import { useCart } from '@/context/cart-context';
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
  const { id, name, colorOptions, storageOptions, basePrice } = product;
  const { addToCart } = useCart();
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );

  // show basePrice until a storage is chosen
  const price = useMemo(
    () => (selectedStorage ? selectedStorage.price : basePrice),
    [selectedStorage, basePrice],
  );
  const canAdd = Boolean(selectedColor && selectedStorage);

  const handleAddToCart = () => {
    if (!canAdd) return;

    addToCart({
      id,
      name,
      selectedStorage: selectedStorage!.capacity,
      selectedColor: selectedColor.name,
      price,
      imageUrl: selectedColor.imageUrl,
    });

    router.push('/cart', { scroll: false });
  };

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
          $fontSize="20px"
          $textTransform="none"
          style={{ marginBottom: '64px' }}
        >
          From {price} EUR
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
                className={
                  selectedColor.hexCode === color.hexCode ? 'selected' : ''
                }
              />
            </ButtonWrapper>
          ))}
        </ColorSwatchWrapper>

        <ParagraphText $textTransform="capitalize" className="selected-color">
          {selectedColor.name}
        </ParagraphText>

        <Button
          text="Añadir"
          variant={canAdd ? 'primary' : 'disabled'}
          onClick={handleAddToCart}
        />
      </SelectorWrapper>
    </ProductContainer>
  );
}
