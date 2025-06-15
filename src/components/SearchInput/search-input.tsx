import { ParagraphText } from '@/components/Header';

import { SearchInputContainer, SearchInputField } from './search-input.styles';

export function SearchInput() {
  return (
    <SearchInputContainer>
      <SearchInputField type="text" placeholder="Search for a smartphone..." />
      <ParagraphText fontSize="12px">20 results</ParagraphText>
    </SearchInputContainer>
  );
}
