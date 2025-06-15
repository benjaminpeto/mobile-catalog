'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ParagraphText } from '@/components/Header';

import {
  ClearButton,
  InputWrapper,
  SearchInputContainer,
  SearchInputField,
} from './search-input.styles';

export function SearchInput() {
  const [inputValue, setInputValue] = useState('');

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <SearchInputContainer>
      <InputWrapper>
        <SearchInputField
          type="text"
          placeholder="Search for a smartphone..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {inputValue && (
          <ClearButton onClick={handleClearInput}>
            <Image src="/x.svg" alt="Clear search" width={8} height={8} />
          </ClearButton>
        )}
      </InputWrapper>
      <ParagraphText fontSize="12px">20 results</ParagraphText>
    </SearchInputContainer>
  );
}
