'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import {
  ClearButton,
  InputWrapper,
  SearchInputContainer,
  SearchInputField,
} from './search-input.styles';

interface SearchInputProps {
  initialValue?: string;
}

export function SearchInput({ initialValue = '' }: SearchInputProps) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);

    // search as you type - onChange
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set('search', next);
      else params.delete('search');
      // replaces the URL without reloading, triggering SSR re-rendering
      router.replace(`/?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <SearchInputContainer>
      <InputWrapper>
        <SearchInputField
          name="search"
          type="text"
          placeholder="Search for a smartphone"
          value={value}
          onChange={handleChange}
        />
        {value && (
          <ClearButton
            type="button"
            onClick={() => {
              setValue('');
              handleChange({ target: { value: '' } } as any);
            }}
          >
            <Image src="/x.svg" alt="Clear search" width={8} height={8} />
          </ClearButton>
        )}
      </InputWrapper>
    </SearchInputContainer>
  );
}
