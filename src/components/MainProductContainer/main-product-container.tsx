'use client';

import { useRouter } from 'next/navigation';

import { Button, ColorSelector, StorageSelector } from '@/components';
import { useCart } from '@/context';
import { useProductConfigurator } from '@/hooks';
import type { ProductEntity } from '@/types/api';

import { MainHeading, ParagraphText } from '../Header';
import {
  ImageContainer,
  ProductContainer,
  ProductImage,
  SelectorWrapper,
} from './main-product-container.styles';

export function MainProductContainer({ product }: { product: ProductEntity }) {
  const { id, name, colorOptions, storageOptions } = product;
  const { addToCart } = useCart();
  const router = useRouter();
  const {
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    price,
    canAdd,
  } = useProductConfigurator(product);

  const handleAdd = () => {
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
        {colorOptions.map(c => (
          <ProductImage
            key={c.hexCode}
            src={c.imageUrl}
            alt={`${name} – ${c.name}`}
            width={510}
            height={630}
            className={
              selectedColor.hexCode === c.hexCode ? 'visible' : 'hidden'
            }
          />
        ))}
      </ImageContainer>

      <SelectorWrapper>
        <MainHeading>{name}</MainHeading>
        <ParagraphText $fontSize="20px" style={{ marginBottom: '64px' }}>
          From {price} EUR
        </ParagraphText>

        <StorageSelector
          options={storageOptions}
          selected={selectedStorage}
          onSelect={setSelectedStorage}
        />

        <ColorSelector
          options={colorOptions}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />

        <ParagraphText $textTransform="capitalize" className="selected-color">
          {selectedColor.name}
        </ParagraphText>

        <Button
          text="Añadir"
          variant={canAdd ? 'primary' : 'disabled'}
          onClick={handleAdd}
        />
      </SelectorWrapper>
    </ProductContainer>
  );
}
